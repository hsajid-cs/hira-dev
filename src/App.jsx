import { useCallback, useEffect, useRef, useState } from 'react';
import Room from './room/Room';
import Panel from './room/Panels';
import { useViewBox } from './room/useViewBox';
import { FULL, byId, stations } from './room/layout';
import { profile } from './data/portfolio';

export default function App() {
  const [active, setActive] = useState(null);
  const [note, setNote] = useState(null);
  const [station, setStation] = useState(1);
  const { svgRef, goTo } = useViewBox(FULL);
  const touch = useRef(null);

  const narrow = () => svgRef.current.getBoundingClientRect().width < 760;

  const stationBox = useCallback((i) => {
    const r = svgRef.current.getBoundingClientRect();
    const w = 400;
    const h = (w * r.height) / r.width;
    const x = Math.min(Math.max(stations[i].cx - w / 2, 0), 1000 - w);
    const y = Math.min(Math.max(340 - h / 2, 0), Math.max(700 - h, 0));
    return [x, y, w, h];
  }, [svgRef]);

  // On a phone the room is seen in three stops; on a wide screen, all at once.
  const home = useCallback((i = station, ms) => {
    goTo(narrow() ? stationBox(i) : FULL, ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo, station, stationBox]);

  useEffect(() => {
    if (narrow()) goTo(stationBox(1), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const target = (spot) => {
    const s = spot.focus || spot;
    const r = svgRef.current.getBoundingClientRect();
    const phone = r.width < 760;
    const vw = phone ? r.width : r.width * 0.5;
    const vh = phone ? r.height * 0.34 : r.height * 0.8;
    const scale = Math.min(Math.min(vw / s.w, vh / s.h) * 0.8, 5);
    const bw = r.width / scale;
    const bh = r.height / scale;
    const [fx, fy] = phone ? [0.5, 0.2] : [0.27, 0.5];
    const cx = s.x + s.w / 2;
    const cy = s.y + s.h / 2;
    return [cx - fx * bw, cy - fy * bh, bw, bh];
  };

  const open = useCallback((id) => {
    setNote(null);
    setActive(id);
    goTo(target(byId[id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo]);

  const back = useCallback(() => {
    setActive(null);
    setNote(null);
    home();
  }, [home]);

  const go = (d) => {
    const i = Math.min(Math.max(station + d, 0), stations.length - 1);
    setStation(i);
    goTo(stationBox(i));
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (active ? back() : setNote(null));
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, back]);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null || active || !narrow()) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="app">
      <header className="head">
        <div className="who">
          <h1>Hira Sajid</h1>
          <p>{profile.short}</p>
        </div>
        <nav className="controls" aria-label="Quick links">
          <button type="button" className={!active ? 'on' : ''} onClick={back}>Room</button>
          <button type="button" className={active === 'notebook' ? 'on' : ''} onClick={() => open('notebook')}>Resume</button>
          <button type="button" className={active === 'phone' ? 'on' : ''} onClick={() => open('phone')}>Contact</button>
        </nav>
      </header>
      <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Room svgRef={svgRef} active={active} note={note} onOpen={open} onNote={setNote} onBackground={() => (active ? back() : setNote(null))} />
        {!active && (
          <div className="walk" aria-label="Move around the room">
            <button type="button" onClick={() => go(-1)} disabled={station === 0} aria-label="Look left">‹</button>
            <span>{stations[station].label}</span>
            <button type="button" onClick={() => go(1)} disabled={station === stations.length - 1} aria-label="Look right">›</button>
          </div>
        )}
      </div>
      {active && <Panel spot={byId[active]} onClose={back} />}
    </div>
  );
}
