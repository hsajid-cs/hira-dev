import * as THREE from 'three';
import { renderToStaticMarkup } from 'react-dom/server';
import Mark from '../jacket/Mark';
import { bonus } from '../jacket/patches';

// A twill weave with a little noise. Tiles seamlessly because the period divides the canvas.
export function denimTexture(base = [63, 93, 128]) {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  let seed = 7;
  const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const t = (x + y) % 16;
      const twill = t < 5 ? 14 : t < 9 ? 0 : -10;
      const weft = (y % 4 === 0 ? -5 : 0) + (x % 4 === 0 ? 3 : 0);
      const n = (rand() - 0.5) * 16;
      const i = (y * size + x) * 4;
      img.data[i] = base[0] + twill + weft + n;
      img.data[i + 1] = base[1] + twill + weft + n;
      img.data[i + 2] = base[2] + twill + weft + n * 0.8;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

const STYLE = '<style>.stitch-text{font-family:Karla,Arial,Helvetica,sans-serif;font-weight:700}.hand{font-family:cursive}</style>';

// bounding box (in patch units) of what each piece draws
function box(item) {
  if (item.type === 'badge') return [-item.w / 2 - 6, -item.h / 2 - 16, item.w + 12, item.h + 22];
  if (item.id === 'craft') return [-58, -70, 116, 128];
  if (item.id === 'uni') return [-item.w / 2 - 8, -item.h / 2 - 10, item.w + 16, item.h + 18];
  return [-item.w / 2 - 8, -item.h / 2 - 8, item.w + 16, item.h + 18];
}

function toTexture(markup, w, h, scale = 4) {
  const tex = new THREE.Texture();
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = Math.round(w * scale);
    c.height = Math.round(h * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    tex.image = c;
    tex.needsUpdate = true;
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  return tex;
}

export function patchTexture(item) {
  const [x, y, w, h] = box(item);
  const inner = renderToStaticMarkup(<Mark item={item} />);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}">${STYLE}${inner}</svg>`;
  return { map: toTexture(svg, w, h), box: [x, y, w, h] };
}

export function bonusTexture(i) {
  const inner = renderToStaticMarkup(<g>{bonus[i]}</g>);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-16 -16 32 32" width="32" height="32">${inner}</svg>`;
  return toTexture(svg, 32, 32, 5);
}

export function nameTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#efe3c6';
  ctx.font = '700 120px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '14px';
  ctx.fillText('HIRA SAJID', 512, 120);
  ctx.font = '500 42px Arial, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('SOFTWARE DEVELOPER + MAKER', 512, 190);
  ctx.strokeStyle = '#e2b768';
  ctx.setLineDash([10, 8]);
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 992, 224);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}
