import ProjectArt from './ProjectArt';
import CraftArt from './CraftArt';
import { pinTitle } from '../pins';

const rotations = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.4, 1.3, -0.3];
const taped = new Set(['panda', 'eco', 'paper', 'now-1', 'like-2', 'rmd']);

export default function Pin({ pin, index, onOpen }) {
  const open = (e) => onOpen(pin, e.currentTarget);
  const style = {
    '--r': `${rotations[index % rotations.length]}deg`,
    '--nudge': `${[0, 6, -4, 10, -8, 3][index % 6]}px`,
  };

  let body;
  if (pin.type === 'project') {
    const p = pin.project;
    body = (
      <>
        <div className="pin-art" style={{ aspectRatio: pin.ratio }}>
          <ProjectArt id={p.id} />
        </div>
        <div className="pin-copy">
          <h3>{p.name}</h3>
          <p className="pin-sub">{p.summary}</p>
          <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </>
    );
  } else if (pin.type === 'craft') {
    body = (
      <>
        <div className="pin-art" style={{ aspectRatio: pin.ratio }}>
          <CraftArt craft={pin.craft} />
        </div>
        <div className="pin-copy">
          <h3 className="hand">{pin.craft.title}</h3>
        </div>
      </>
    );
  } else if (pin.type === 'skill') {
    body = (
      <div className="pin-copy">
        <h3>{pin.skill.name}</h3>
        <p className="pin-sub">{pin.skill.note}</p>
      </div>
    );
  } else if (pin.type === 'like') {
    body = (
      <div className="pin-copy">
        <h3>{pin.like.title}</h3>
        <p className="pin-sub hand">{pin.like.note}</p>
      </div>
    );
  } else {
    body = (
      <div className="pin-copy">
        <span className="now-label">currently {pin.now.label}</span>
        <p className="now-text">{pin.now.text}</p>
      </div>
    );
  }

  return (
    <article className={`pin-wrap ${pin.type === 'project' && pin.note && index % 2 ? 'note-left' : ''}`} style={style}>
      <button
        type="button"
        className={`pin pin-${pin.type} tone-${pin.tone} ${pin.size ? `size-${pin.size}` : ''} ${taped.has(pin.id) ? 'taped' : ''}`}
        onClick={open}
        aria-label={`Open ${pinTitle(pin)}`}
      >
        {body}
      </button>
      {pin.note && <span className="scribble" aria-hidden="true">{pin.note}</span>}
    </article>
  );
}
