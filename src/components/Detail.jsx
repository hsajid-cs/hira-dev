import { useEffect, useLayoutEffect, useRef } from 'react';
import ProjectArt from './ProjectArt';
import CraftArt from './CraftArt';
import { BOARDS, pinTitle } from '../pins';

export default function Detail({ pin, origin, onClose }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);
  const board = BOARDS.find((b) => b.id === pin.board);

  // Grow the panel out of the pin that was clicked.
  useLayoutEffect(() => {
    const el = panel.current;
    if (!el || !origin) return;
    const from = origin.getBoundingClientRect();
    const to = el.getBoundingClientRect();
    el.style.setProperty('--dx', `${from.left + from.width / 2 - (to.left + to.width / 2)}px`);
    el.style.setProperty('--dy', `${from.top + from.height / 2 - (to.top + to.height / 2)}px`);
    el.style.setProperty('--s', Math.min(0.9, Math.max(0.25, from.width / to.width)).toFixed(2));
  }, [origin]);

  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      origin?.focus?.();
    };
  }, [onClose, origin]);

  let visual;
  let info;
  if (pin.project) {
    const p = pin.project;
    visual = <ProjectArt id={p.id} fit="meet" />;
    info = (
      <>
        <p className="detail-board">{board.title} · {p.year}</p>
        <h2>{p.name}</h2>
        <p className="detail-full">{p.full}</p>
        <p>{p.summary}</p>
        <dl className="story">
          <dt>The problem</dt><dd>{p.problem}</dd>
          <dt>What I did</dt><dd>{p.approach}</dd>
          <dt>How it went</dt><dd>{p.result}</dd>
        </dl>
        <p className="contribution"><b>My part:</b> {p.contribution}</p>
        <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        <a className="btn" href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label} ↗</a>
      </>
    );
  } else if (pin.craft) {
    visual = <CraftArt craft={pin.craft} />;
    info = (
      <>
        <p className="detail-board">{board.title}</p>
        <h2>{pin.craft.title}</h2>
        <p>{pin.craft.note}</p>
      </>
    );
  } else if (pin.skill) {
    info = (
      <>
        <p className="detail-board">{board.title}</p>
        <h2>{pin.skill.name}</h2>
        <p>{pin.skill.note}</p>
        {pin.usedIn.length > 0 && (
          <>
            <p className="detail-full">Used in</p>
            <ul className="tags">{pin.usedIn.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
          </>
        )}
      </>
    );
  } else if (pin.like) {
    info = (
      <>
        <p className="detail-board">{board.title}</p>
        <h2>{pin.like.title}</h2>
        <p className="hand big">{pin.like.note}</p>
      </>
    );
  } else {
    info = (
      <>
        <p className="detail-board">{board.title}</p>
        <h2>currently {pin.now.label}</h2>
        <p className="hand big">{pin.now.text}</p>
      </>
    );
  }

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`detail tone-${pin.tone} ${visual ? '' : 'detail-text'}`} ref={panel} role="dialog" aria-modal="true" aria-label={pinTitle(pin)}>
        <button type="button" className="close" onClick={onClose} ref={closeBtn} aria-label="Close">×</button>
        {visual && <div className="detail-art">{visual}</div>}
        <div className="detail-info">{info}</div>
      </div>
    </div>
  );
}
