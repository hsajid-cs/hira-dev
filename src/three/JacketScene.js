import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { items, bonusSpots } from '../jacket/layout';
import { denimTexture, patchTexture, bonusTexture, nameTexture } from './textures.jsx';

const K = 0.004; // world units per 2D pixel of the flat layout
const A = 0.52; // torso half width
const B = 0.31; // torso half depth
const SLEEVE_LEN = 1.55;
const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// Plane bent around its own y axis so a flat patch hugs the cloth.
function bentPlane(w, h, radius) {
  const g = new THREE.PlaneGeometry(w, h, 18, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i += 1) {
    const a = p.getX(i) / radius;
    p.setX(i, radius * Math.sin(a));
    p.setZ(i, radius * (Math.cos(a) - 1));
  }
  g.computeVertexNormals();
  return g;
}

const shadowTexture = (() => {
  let tex;
  return () => {
    if (tex) return tex;
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 6, 32, 32, 32);
    g.addColorStop(0, 'rgba(0,0,0,.55)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    tex = new THREE.CanvasTexture(c);
    return tex;
  };
})();

export default class JacketScene {
  constructor(canvas, handlers) {
    this.canvas = canvas;
    this.handlers = handlers;
    this.patches = new Map();
    this.bonus = [];
    this.trinkets = [];
    this.hover = null;
    this.interacted = false;
    this.sway = 1;
    this.tween = null;
    this.saved = null;
    this.active = null;
    this.off = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.down = null;
    this.ray = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
    this.camera.position.set(0, 0.08, 5.6);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 1.6;
    this.controls.maxDistance = 8;
    this.controls.minPolarAngle = 0.55;
    this.controls.maxPolarAngle = 2.2;
    this.controls.target.set(0, 0.02, 0);

    this.lights();
    this.build();
    this.resize();
    this.frame = this.frame.bind(this);
    this.raf = requestAnimationFrame(this.frame);

    canvas.addEventListener('pointerdown', this.onDown = (e) => {
      this.down = { x: e.clientX, y: e.clientY, t: performance.now() };
      this.interacted = true;
    });
    canvas.addEventListener('pointerup', this.onUp = (e) => {
      const d = this.down;
      this.down = null;
      if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 7 || performance.now() - d.t > 450) return;
      const hit = this.pick(e);
      if (hit?.patch) this.handlers.onOpen(hit.patch);
      else if (hit?.trinket) this.handlers.onNote(hit.trinket, this.screenOf(hit.object));
      else this.handlers.onBackground();
    });
    canvas.addEventListener('pointermove', this.onMove = (e) => {
      if (e.pointerType === 'touch' || this.down) return;
      const hit = this.pick(e);
      const id = hit?.patch || (hit?.trinket ? `t:${hit.trinket}` : null);
      if (id !== this.hover) {
        this.hover = id;
        canvas.style.cursor = id ? 'pointer' : 'grab';
      }
      this.handlers.onHover(hit?.patch ? { id: hit.patch, x: e.clientX, y: e.clientY } : null);
    });
    canvas.addEventListener('pointerleave', this.onLeave = () => { this.hover = null; this.handlers.onHover(null); });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement);
  }

  lights() {
    this.scene.add(new THREE.HemisphereLight(0xfff3df, 0x4a3a2a, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(2.2, 3.2, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: 0.5, far: 12 });
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x9db8ff, 0.55);
    rim.position.set(-3, 1.5, -3);
    this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffe2b8, 0.4);
    fill.position.set(-3, 0.5, 3);
    this.scene.add(fill);
  }

  build() {
    this.jacket = new THREE.Group();
    this.scene.add(this.jacket);

    const map = denimTexture();
    const mat = new THREE.MeshStandardMaterial({ map, bumpMap: map, bumpScale: 0.9, roughness: 0.92, metalness: 0, side: THREE.DoubleSide });
    const dark = mat.clone();
    dark.color = new THREE.Color(0x9aa6b8);
    this.mat = mat;

    // torso
    const prof = [[0.93, -1.22], [0.97, -1.1], [0.99, -0.6], [1.0, 0], [1.0, 0.5], [0.95, 0.7], [0.82, 0.85], [0.68, 0.95], [0.55, 1.01], [0.47, 1.04]]
      .map(([r, y]) => new THREE.Vector2(r, y));
    const torsoGeo = new THREE.LatheGeometry(prof, 96);
    const uvs = torsoGeo.attributes.uv;
    for (let i = 0; i < uvs.count; i += 1) uvs.setXY(i, uvs.getX(i) * 6, uvs.getY(i) * 5);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.scale.set(A, 1, B);
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.jacket.add(torso);

    // waistband and collar
    const band = new THREE.Mesh(new THREE.LatheGeometry([[0.945, -1.22], [0.96, -1.12], [0.975, -1.02]].map(([r, y]) => new THREE.Vector2(r, y)), 96), dark);
    band.scale.set(A * 1.004, 1, B * 1.004);
    band.castShadow = true;
    this.jacket.add(band);
    const collar = new THREE.Mesh(new THREE.LatheGeometry([[0.5, 0.98], [0.53, 1.05], [0.58, 1.12], [0.64, 1.17]].map(([r, y]) => new THREE.Vector2(r, y)), 64, 0, Math.PI * 2), dark);
    collar.scale.set(A * 0.95, 1, B * 0.95);
    collar.castShadow = true;
    this.jacket.add(collar);
    [-1, 1].forEach((s) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0.2 * s, 0.02);
      shape.lineTo(0.05 * s, -0.3);
      shape.closePath();
      const lapel = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.012, bevelEnabled: false }), dark);
      lapel.position.set(0.02 * s, 1.08, B * 0.52);
      lapel.rotation.set(-0.35, 0.28 * -s, 0.1 * s);
      lapel.castShadow = true;
      this.jacket.add(lapel);
    });

    // sleeves
    this.sleeves = [-1, 1].map((s) => {
      const g = new THREE.Group();
      g.position.set(s * 0.6, 0.76, 0);
      g.rotation.z = s * 0.17;
      g.rotation.x = 0.06;
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, SLEEVE_LEN, 48, 1, true), mat);
      sleeve.position.y = -SLEEVE_LEN / 2;
      sleeve.castShadow = true;
      sleeve.receiveShadow = true;
      g.add(sleeve);
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.173, 0.176, 0.17, 48, 1, true), dark);
      cuff.position.y = -SLEEVE_LEN + 0.07;
      cuff.castShadow = true;
      g.add(cuff);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.205, 32, 20), mat);
      cap.scale.set(1, 0.9, 1);
      cap.castShadow = true;
      g.add(cap);
      this.jacket.add(g);
      return g;
    });

    // zipper, placket and stitching
    const metal = new THREE.MeshStandardMaterial({ color: 0xc9c9c9, metalness: 0.8, roughness: 0.35 });
    const thread = new THREE.MeshStandardMaterial({ color: 0xe2b768, roughness: 0.6 });
    const placket = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.0, 0.006), new THREE.MeshStandardMaterial({ color: 0x2b4466, roughness: 0.95 }));
    placket.position.set(0, -0.2, B + 0.004);
    this.jacket.add(placket);
    const zip = new THREE.Mesh(new THREE.BoxGeometry(0.014, 2.0, 0.01), metal);
    zip.position.set(0, -0.2, B + 0.01);
    this.jacket.add(zip);
    const dash = (pts) => {
      const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.02, 0.0045, 0.0045), thread, pts.length);
      const m = new THREE.Matrix4();
      pts.forEach((p, i) => {
        m.compose(p.pos, new THREE.Quaternion().setFromEuler(new THREE.Euler(0, p.yaw || 0, p.roll || 0)), new THREE.Vector3(1, 1, 1));
        inst.setMatrixAt(i, m);
      });
      this.jacket.add(inst);
    };
    const line = [];
    [-0.055, 0.055].forEach((x) => { for (let y = -1.18; y < 0.98; y += 0.045) line.push({ pos: new THREE.Vector3(x, y, B + 0.008), roll: Math.PI / 2 }); });
    dash(line);
    const hem = [];
    for (let i = 0; i < 150; i += 1) {
      const a = (i / 150) * Math.PI * 2;
      hem.push({ pos: new THREE.Vector3(A * 0.98 * Math.sin(a), -1.0, B * 0.98 * Math.cos(a) + (Math.cos(a) > 0 ? 0.008 : -0.008)), yaw: Math.atan2(B * Math.sin(a), A * Math.cos(a)) + Math.PI / 2 });
    }
    dash(hem);
    const pull = new THREE.Group();
    pull.position.set(0, 0.93, B + 0.012);
    const tab = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.06, 0.012), metal);
    pull.add(tab);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.004, 8, 20), metal);
    ring.position.y = -0.05;
    pull.add(ring);
    this.jacket.add(pull);
    this.addTrinkets(pull);

    // name on the back
    const back = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.155), new THREE.MeshStandardMaterial({ map: nameTexture(), emissiveMap: nameTexture(), emissive: 0xffffff, emissiveIntensity: 0.45, transparent: true, roughness: 0.9 }));
    back.position.set(0, 0.5, -B * 0.99 - 0.004);
    back.rotation.y = Math.PI;
    this.jacket.add(back);

    // hanger
    const wood = new THREE.MeshStandardMaterial({ color: 0x9a6a3e, roughness: 0.6 });
    [-1, 1].forEach((s) => {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.64, 12), wood);
      bar.position.set(s * 0.26, 1.03, 0);
      bar.rotation.z = s * 1.18;
      this.jacket.add(bar);
    });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.14, 12), wood);
    stem.position.set(0, 1.32, 0);
    this.jacket.add(stem);
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.013, 10, 28, Math.PI * 1.45), new THREE.MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.8, roughness: 0.3 }));
    hook.position.set(0.045, 1.46, 0);
    hook.rotation.z = Math.PI * 0.05;
    this.jacket.add(hook);

    items.forEach((it) => this.addPatch(it));
  }

  // Where a patch from the flat layout sits on the cloth.
  place(it) {
    const left = it.x < 190;
    const right = it.x > 450;
    if (left || right) {
      const s = left ? -1 : 1;
      const ty = Math.min(Math.max((it.y - 180) / (640 - 180), 0), 1);
      const y = -(0.14 + ty * (SLEEVE_LEN - 0.42));
      const r = 0.2 + (0.17 - 0.2) * (-y / SLEEVE_LEN) + 0.004;
      const th = s * 0.3;
      return { parent: this.sleeves[left ? 0 : 1], pos: new THREE.Vector3(r * Math.sin(th), y, r * Math.cos(th)), yaw: th, radius: r, scale: 0.78 };
    }
    const y = 1.02 - (it.y - 96) * 0.00355;
    const x = Math.max(-A * 0.93, Math.min(A * 0.93, (it.x - 320) * K));
    const phi = Math.asin(x / A);
    const rho = Math.pow(A * A * Math.cos(phi) ** 2 + B * B * Math.sin(phi) ** 2, 1.5) / (A * B);
    return {
      parent: this.jacket,
      pos: new THREE.Vector3(A * Math.sin(phi), y, B * Math.cos(phi) + 0.004),
      yaw: Math.atan2(B * Math.sin(phi), A * Math.cos(phi)),
      radius: Math.min(Math.max(rho, 0.2), 1.4),
      scale: 1,
    };
  }

  addPatch(it) {
    const { map, box } = patchTexture(it);
    const pl = this.place(it);
    const w = box[2] * K * pl.scale;
    const h = box[3] * K * pl.scale;
    const group = new THREE.Group();
    group.position.copy(pl.pos);
    group.rotation.y = pl.yaw;
    group.rotation.z = -THREE.MathUtils.degToRad(it.r);
    const lift = new THREE.Group();
    group.add(lift);

    const shadow = new THREE.Mesh(bentPlane(w * 1.25, h * 1.25, pl.radius), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: 0.8 }));
    shadow.position.set(0.006, -0.01, 0.0015);
    group.add(shadow);

    const material = new THREE.MeshStandardMaterial({ map, transparent: true, alphaTest: 0.06, roughness: 0.88, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(bentPlane(w, h, pl.radius), material);
    mesh.position.z = 0.004;
    mesh.castShadow = true;
    mesh.userData.patch = it.id;
    lift.add(mesh);

    pl.parent.add(group);
    this.patches.set(it.id, { group, lift, mesh, material, shadow, w, h, item: it, k: 0 });
  }

  addTrinkets(pull) {
    // keychain on the zipper pull
    const chain = new THREE.Group();
    chain.position.set(0, -0.06, 0.004);
    const link = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.09, 6), new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.4 }));
    link.position.y = -0.045;
    chain.add(link);
    const tag = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.065, 0.01), new THREE.MeshStandardMaterial({ color: 0xe9d6a8, roughness: 0.8 }));
    tag.position.y = -0.12;
    tag.castShadow = true;
    tag.userData.trinket = 'keychain';
    chain.add(tag);
    pull.add(chain);
    this.trinkets.push({ id: 'keychain', group: chain, phase: 0, lines: ['currently building…', 'AI automation workflows', 'at Quest'] });

    // paper tag on the left cuff
    const cuff = new THREE.Group();
    cuff.position.set(0.0, -SLEEVE_LEN + 0.02, 0.17);
    const string = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.08, 6), new THREE.MeshStandardMaterial({ color: 0x8a6f35 }));
    string.position.y = -0.04;
    cuff.add(string);
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, 0.008), new THREE.MeshStandardMaterial({ color: 0xe9d6a8, roughness: 0.85 }));
    paper.position.y = -0.115;
    paper.castShadow = true;
    paper.userData.trinket = 'tag';
    cuff.add(paper);
    this.sleeves[0].add(cuff);
    this.trinkets.push({ id: 'tag', group: cuff, phase: 1.7, lines: ['currently learning…', 'Git, properly this time'] });

    // tiny notebook on the hem
    const nb = new THREE.Group();
    nb.position.set(-0.4, -1.2, B * 0.78);
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.1, 6), new THREE.MeshStandardMaterial({ color: 0xc9a46a }));
    cord.position.y = -0.05;
    nb.add(cord);
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.1, 0.014), new THREE.MeshStandardMaterial({ color: 0x6b8f7a, roughness: 0.8 }));
    book.position.y = -0.14;
    book.castShadow = true;
    book.userData.trinket = 'notebook';
    nb.add(book);
    this.jacket.add(nb);
    this.trinkets.push({ id: 'notebook', group: nb, phase: 3.1, lines: ['currently researching…', 'PANDA, EEG pain detection'] });
  }

  setSeen(count) {
    while (this.bonus.length < Math.min(count, bonusSpots.length)) {
      const i = this.bonus.length;
      const [x2, y2, r] = bonusSpots[i];
      const pl = this.place({ x: x2, y: y2 });
      const mat = new THREE.MeshStandardMaterial({ map: bonusTexture(i), transparent: true, alphaTest: 0.3, roughness: 0.85, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(bentPlane(0.14, 0.14, pl.radius), mat);
      mesh.castShadow = true;
      mesh.position.z = 0.004;
      const g = new THREE.Group();
      g.position.copy(pl.pos);
      g.rotation.y = pl.yaw;
      g.rotation.z = -THREE.MathUtils.degToRad(r);
      g.scale.setScalar(0.001);
      g.add(mesh);
      pl.parent.add(g);
      this.bonus.push({ g, t: 0 });
    }
  }

  setActive(id) {
    const prev = this.active;
    this.active = id;
    this.handlers.onHover(null);
    if (prev && this.patches.has(prev)) this.patches.get(prev).material.opacity = 1;
    if (!id) {
      if (this.saved) this.flyTo(this.saved.pos, this.saved.target, { x: 0, y: 0 }, () => { this.controls.enabled = true; });
      this.saved = null;
      return;
    }
    const p = this.patches.get(id);
    if (!p) return;
    p.material.opacity = 0.28;
    if (!this.saved) this.saved = { pos: this.camera.position.clone(), target: this.controls.target.clone() };
    this.controls.enabled = false;
    // aim at where the patch will be once the idle sway has settled
    const swayed = this.jacket.rotation.y;
    this.jacket.rotation.y = 0;
    this.jacket.updateMatrixWorld(true);
    const pos = new THREE.Vector3();
    p.mesh.getWorldPosition(pos);
    const n = new THREE.Vector3(0, 0, 1).transformDirection(p.mesh.matrixWorld);
    this.jacket.rotation.y = swayed;
    this.jacket.updateMatrixWorld(true);
    const dist = 0.72 + Math.max(p.w, p.h) * 2.1;
    const cam = pos.clone().addScaledVector(n, dist);
    cam.y += 0.04;
    const narrow = this.canvas.clientWidth < 760;
    this.flyTo(cam, pos, narrow ? { x: 0, y: 0.27 } : { x: 0.23, y: 0 });
  }

  flyTo(pos, target, off, done) {
    this.tween = {
      t0: performance.now(), dur: 780, done,
      p0: this.camera.position.clone(), p1: pos.clone(),
      t0v: this.controls.target.clone(), t1v: target.clone(),
      o0: { ...this.off }, o1: off,
    };
  }

  applyOffset() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (Math.abs(this.off.x) + Math.abs(this.off.y) < 0.0005) this.camera.clearViewOffset();
    else this.camera.setViewOffset(w, h, this.off.x * w, this.off.y * h, w, h);
  }

  fitDistance() {
    const aspect = this.camera.aspect;
    const t = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    return Math.max(4.9, 1.12 / (t * aspect));
  }

  resize() {
    const el = this.canvas.parentElement;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (!this.interacted && !this.active && !this.tween) {
      const dir = this.camera.position.clone().sub(this.controls.target).normalize();
      this.camera.position.copy(this.controls.target).addScaledVector(dir, this.fitDistance());
      this.controls.update();
    }
    this.applyOffset();
  }

  ndc(e) {
    const r = this.canvas.getBoundingClientRect();
    this.mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }

  pick(e) {
    this.ndc(e);
    this.ray.setFromCamera(this.mouse, this.camera);
    const targets = [];
    this.patches.forEach((p) => targets.push(p.mesh));
    this.trinkets.forEach((t) => t.group.traverse((o) => o.userData.trinket && targets.push(o)));
    this.jacket.updateMatrixWorld(true);
    const hit = this.ray.intersectObjects(targets, false)[0];
    if (!hit) return null;
    return { patch: hit.object.userData.patch, trinket: hit.object.userData.trinket, object: hit.object };
  }

  screenOf(obj) {
    const v = new THREE.Vector3();
    obj.getWorldPosition(v);
    v.project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height };
  }

  trinketNote(id) {
    return this.trinkets.find((t) => t.id === id)?.lines;
  }

  frame() {
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;

    if (this.tween) {
      const k = Math.min(1, (performance.now() - this.tween.t0) / this.tween.dur);
      const e = ease(k);
      this.camera.position.lerpVectors(this.tween.p0, this.tween.p1, e);
      this.controls.target.lerpVectors(this.tween.t0v, this.tween.t1v, e);
      this.off.x = this.tween.o0.x + (this.tween.o1.x - this.tween.o0.x) * e;
      this.off.y = this.tween.o0.y + (this.tween.o1.y - this.tween.o0.y) * e;
      this.applyOffset();
      if (k >= 1) { const d = this.tween.done; this.tween = null; d?.(); }
    }
    if (!this.tween && this.controls.enabled) this.controls.update();
    else this.camera.lookAt(this.controls.target);

    // gentle sway until someone touches it
    if (this.interacted || this.active) this.sway = Math.max(0, this.sway - dt * 4);
    else this.sway = Math.min(1, this.sway + dt);
    this.jacket.rotation.y = Math.sin(t * 0.6) * 0.28 * this.sway;

    this.patches.forEach((p, id) => {
      const target = this.hover === id && !this.active ? 1 : 0;
      p.k += (target - p.k) * Math.min(1, dt * 12);
      p.lift.position.z = p.k * 0.05;
      p.lift.position.y = p.k * 0.012;
      p.lift.scale.setScalar(1 + p.k * 0.06);
      p.shadow.material.opacity = 0.8 - p.k * 0.2;
    });
    this.trinkets.forEach((tr) => {
      tr.group.rotation.z = Math.sin(t * 1.4 + tr.phase) * 0.06 + (this.hover === `t:${tr.id}` ? Math.sin(t * 9) * 0.1 : 0);
    });
    this.bonus.forEach((b) => {
      b.t = Math.min(1, b.t + dt * 2.2);
      const s = b.t < 1 ? 1 + Math.sin(b.t * Math.PI) * 0.35 * (1 - b.t) - (1 - b.t) * (1 - b.t) : 1;
      b.g.scale.setScalar(Math.max(0.001, b.t * s));
    });
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    ['pointerdown', 'pointerup', 'pointermove', 'pointerleave'].forEach((n) => {
      const fn = { pointerdown: this.onDown, pointerup: this.onUp, pointermove: this.onMove, pointerleave: this.onLeave }[n];
      this.canvas.removeEventListener(n, fn);
    });
    this.controls.dispose();
    this.scene.traverse((o) => {
      o.geometry?.dispose?.();
      const m = o.material;
      (Array.isArray(m) ? m : m ? [m] : []).forEach((x) => { x.map?.dispose?.(); x.dispose?.(); });
    });
    this.renderer.dispose();
  }
}

