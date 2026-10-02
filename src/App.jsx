import { useCallback, useEffect, useState } from 'react';
import Jacket3D from './three/Jacket3D';
import Card from './jacket/Card';
import { items, byId } from './jacket/layout';
import { profile } from './data/portfolio';

export default function App() {
  const [active, setActive] = useState(null);
  const [seen, setSeen] = useState([]);
  const [failed, setFailed] = useState(false);

  const open = useCallback((id) => {
    setActive(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  }, []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <div className="app">
      <header className="head">
        <div>
          <h1>HIRA SAJID</h1>
          <p>{profile.short}</p>
        </div>
        <p className="hint">drag to turn it, click a patch</p>
      </header>

      {failed ? (
        <p className="nogl">This browser could not start 3D graphics. The patches are listed below instead.</p>
      ) : (
        <Jacket3D active={active} seen={seen.length} onOpen={open} onBackground={close} onFail={() => setFailed(true)} />
      )}

      <details className="index" open={failed}>
        <summary>Patch index</summary>
        <ul>
          {items.map((it) => (
            <li key={it.id}><button type="button" onClick={() => open(it.id)}>{it.label} <span>{it.sub}</span></button></li>
          ))}
        </ul>
      </details>

      {active && <Card item={byId[active]} onClose={close} onOpen={open} />}
    </div>
  );
}
