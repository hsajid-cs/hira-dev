import { useEffect, useRef, useState } from 'react';
import JacketScene from './JacketScene';
import { byId } from '../jacket/layout';

export default function Jacket3D({ active, seen, onOpen, onBackground, onFail }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const tipRef = useRef(null);
  const [tip, setTip] = useState(null);
  const [note, setNote] = useState(null);
  const handlers = useRef({});

  handlers.current = {
    onOpen: (id) => { setNote(null); onOpen(id); },
    onBackground: () => { setNote(null); onBackground(); },
    onNote: (id, at) => {
      const lines = sceneRef.current?.trinketNote(id);
      setNote((n) => (n?.id === id ? null : { id, lines, ...at }));
    },
    onHover: (h) => {
      const el = tipRef.current;
      if (!h) { el?.setAttribute('data-show', '0'); return; }
      if (el) {
        el.style.transform = `translate(${h.x + 14}px, ${h.y + 16}px)`;
        el.setAttribute('data-show', '1');
      }
      setTip((t) => (t === h.id ? t : h.id));
    },
  };

  useEffect(() => {
    let scene;
    try {
      scene = new JacketScene(canvasRef.current, {
        onOpen: (id) => handlers.current.onOpen(id),
        onBackground: () => handlers.current.onBackground(),
        onNote: (id, at) => handlers.current.onNote(id, at),
        onHover: (h) => handlers.current.onHover(h),
      });
    } catch (err) {
      onFail();
      return undefined;
    }
    sceneRef.current = scene;
    return () => { scene.dispose(); sceneRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { sceneRef.current?.setActive(active); }, [active]);
  useEffect(() => { sceneRef.current?.setSeen(seen); }, [seen]);

  const item = tip && byId[tip];
  return (
    <div className="gl">
      <canvas ref={canvasRef} aria-label="A 3D denim jacket covered in patches. Drag to turn it, click a patch to open it." role="img" />
      <div className="tip3d" ref={tipRef} data-show="0">
        {item && (<><b>{item.label}</b><span>{item.sub}</span></>)}
      </div>
      {note && (
        <div className="note3d" style={{ left: note.x, top: note.y }} role="status">
          <b>{note.lines[0]}</b>
          {note.lines.slice(1).map((l) => <span key={l}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
