import { useCallback, useEffect, useState } from 'react';
import Jacket from './jacket/Jacket';
import Card from './jacket/Card';
import { useViewBox } from './jacket/useViewBox';
import { FULL, byId } from './jacket/layout';
import { profile } from './data/portfolio';

export default function App() {
  const [active, setActive] = useState(null);
  const [seen, setSeen] = useState([]);
  const [note, setNote] = useState(null);
  const { svgRef, goTo } = useViewBox(FULL);

  // Where to point the camera so the patch sits beside (or above) the card.
  const target = (item) => {
    const r = svgRef.current.getBoundingClientRect();
    const narrow = r.width < 760;
    const bw = narrow ? Math.max(item.w * 2.6, 210) : Math.max(item.w * 3.4, 300);
    const bh = (bw * r.height) / r.width;
    const [fx, fy] = narrow ? [0.5, 0.2] : [0.3, 0.5];
    return [item.x - fx * bw, item.y - fy * bh, bw, bh];
  };

  const open = useCallback((id) => {
    setNote(null);
    setActive(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
    goTo(target(byId[id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo]);

  const close = useCallback(() => {
    setActive(null);
    goTo(FULL);
  }, [goTo]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (active ? close() : setNote(null));
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, close]);

  return (
    <div className="app">
      <header className="head">
        <div>
          <h1>HIRA SAJID</h1>
          <p>{profile.short}</p>
        </div>
        <p className="hint">tap a patch</p>
      </header>
      <Jacket
        svgRef={svgRef}
        active={active}
        seen={seen}
        note={note}
        onOpen={open}
        onNote={setNote}
        onBackground={() => (active ? close() : setNote(null))}
      />
      {active && <Card item={byId[active]} onClose={close} onOpen={open} />}
    </div>
  );
}
