import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from './data/portfolio';
import { roll, groups } from './roll';
import Camera from './components/Camera';
import Scene from './components/Scenes';
import Back from './components/Back';

const tilt = [-3.2, 2.1, -1.2, 3.4, -2.4, 1.3, -3.6, 2.8, -0.8, 1.9, -2.9, 3.1];
const drop = [0, 12, -6, 16, 6, -8, 14, 2, 18, -4, 10, 4];

function Photo({ shot, index, fresh, slotRef, onOpen }) {
  const ref = useRef(null);
  const [isNew] = useState(fresh);
  const [developing, setDeveloping] = useState(fresh);

  useEffect(() => {
    if (!developing) return undefined;
    const t = setTimeout(() => setDeveloping(false), 5600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Slide out of the camera slot into place.
  useLayoutEffect(() => {
    if (!isNew || !ref.current || !slotRef.current) return;
    const to = ref.current.getBoundingClientRect();
    const from = slotRef.current.getBoundingClientRect();
    ref.current.style.setProperty('--fx', `${from.left + from.width / 2 - (to.left + to.width / 2)}px`);
    ref.current.style.setProperty('--fy', `${from.top + from.height / 2 - (to.top + to.height / 2) - 70}px`);
    if (index > 0) ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isNew, index, slotRef]);

  return (
    <button
      ref={ref}
      type="button"
      className={`photo ${isNew ? 'fresh' : ''}`}
      style={{ '--r': `${tilt[index % tilt.length]}deg`, '--dy': `${drop[index % drop.length]}px` }}
      onClick={(e) => onOpen(shot, e.currentTarget)}
      aria-label={`Open ${shot.caption}`}
    >
      <span className="shot">
        <Scene id={shot.scene} />
        {developing && <i className="cover" />}
      </span>
      <span className="cap">{shot.caption}</span>
    </button>
  );
}

export default function App() {
  const [taken, setTaken] = useState([]);
  const [fresh, setFresh] = useState(null);
  const [flash, setFlash] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [open, setOpen] = useState(null);
  const slotRef = useRef(null);
  const queue = useRef([]);
  const timer = useRef(0);

  const left = roll.length - taken.length;

  const fire = useCallback((id) => {
    setFlash(true);
    setShaking(true);
    setTimeout(() => setFlash(false), 260);
    setTimeout(() => setShaking(false), 300);
    setTaken((t) => (t.includes(id) ? t : [...t, id]));
    setFresh(id);
  }, []);

  const run = useCallback(() => {
    if (timer.current || !queue.current.length) return;
    const next = () => {
      const id = queue.current.shift();
      if (!id) { timer.current = 0; return; }
      fire(id);
      timer.current = setTimeout(next, 750);
    };
    next();
  }, [fire]);

  const enqueue = useCallback((ids, current) => {
    const fresh_ = ids.filter((id) => !current.includes(id) && !queue.current.includes(id));
    queue.current.push(...fresh_);
    run();
  }, [run]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const shutter = () => {
    const nextId = roll.find((r) => !taken.includes(r.id) && !queue.current.includes(r.id))?.id;
    if (nextId) enqueue([nextId], taken);
  };
  const shootGroup = (g) => enqueue(roll.filter((r) => r.group === g).map((r) => r.id), taken);
  const shootAll = () => enqueue(roll.map((r) => r.id), taken);

  const photos = taken.map((id) => roll.find((r) => r.id === id));

  return (
    <div className="page">
      <header className="top">
        <h1>Hira Sajid</h1>
        <p>{profile.short}</p>
      </header>

      <nav className="sheet" aria-label="Sections">
        {groups.map((g) => {
          const ids = roll.filter((r) => r.group === g.id).map((r) => r.id);
          const done = ids.every((id) => taken.includes(id));
          return (
            <button key={g.id} type="button" className={done ? 'done' : ''} onClick={() => shootGroup(g.id)}>
              {g.label}
            </button>
          );
        })}
        <button type="button" className="all" onClick={shootAll} disabled={left === 0}>shoot the whole roll</button>
      </nav>

      <main className="studio">
        <div className="rig">
          <Camera left={left} slotRef={slotRef} onShoot={shutter} shaking={shaking} />
          <p className="hint">{taken.length === 0 ? 'press the red button' : left === 0 ? 'roll finished. open any photo.' : 'again?'}</p>
        </div>
        <div className="table" aria-live="polite">
          {photos.length === 0 && <p className="empty">Nothing developed yet.</p>}
          {photos.map((shot, i) => (
            <Photo key={shot.id} shot={shot} index={i} fresh={fresh === shot.id} slotRef={slotRef} onOpen={(s, el) => setOpen({ shot: s, el })} />
          ))}
        </div>
      </main>

      {flash && <div className="flash" aria-hidden="true" />}
      {open && <Back shot={open.shot} origin={open.el} onClose={() => setOpen(null)} />}
    </div>
  );
}
