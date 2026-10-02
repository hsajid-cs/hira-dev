import { useMemo, useState } from 'react';
import {
  profile, projects, experience, education, volunteering, certifications,
} from './data/portfolio';
import Hira, { art } from './components/Hira';
import { categories, traits, traitKey, ProjectBlock, Job, CraftGrid } from './traits';

const start = { hair: 'long', outfit: 'tee', accessory: 'none', sticker: 'none', craft: 'none', books: 'none' };

function Icon({ id }) {
  return (
    <svg viewBox="-46 -40 92 80" width="52" height="46" aria-hidden="true">
      <g transform="scale(.9)">{art[id]}</g>
    </svg>
  );
}

export default function App() {
  const [pick, setPick] = useState(start);
  const [tab, setTab] = useState('outfit');
  const [focus, setFocus] = useState(null);

  const cat = categories.find((c) => c.id === tab);
  const keys = useMemo(
    () => categories.filter((c) => pick[c.id] !== 'none').map((c) => traitKey(c, pick[c.id])),
    [pick],
  );
  const meaningful = keys.filter((k) => traits[k].body);
  const shown = focus && keys.includes(focus) ? focus : meaningful[meaningful.length - 1] || null;
  const trait = shown && traits[shown];

  const choose = (c, value) => {
    setPick((p) => ({ ...p, [c.id]: value }));
    setFocus(value === 'none' ? null : traitKey(c, value));
  };
  const surprise = () => {
    const next = {};
    categories.forEach((c) => {
      const pool = c.none ? ['none', ...c.options.map(([v]) => v)] : c.options.map(([v]) => v);
      next[c.id] = pool[Math.floor(Math.random() * pool.length)];
    });
    setPick(next);
    setFocus(null);
  };
  const reset = () => { setPick(start); setFocus(null); };

  return (
    <div className="page">
      <header className="top">
        <div>
          <h1>Build your Hira</h1>
          <p>Pick things for a little me. Each one says something true. <a href="#plain">Skip the game</a></p>
        </div>
      </header>

      <main className="builder">
        <section className="stage" aria-label="Preview">
          <Hira pick={pick} />
          <div className="stage-actions">
            <button type="button" onClick={surprise}>Surprise me</button>
            <button type="button" onClick={reset}>Reset</button>
          </div>
        </section>

        <section className="side">
          <div className="tabs" role="tablist" aria-label="What to change">
            {categories.map((c) => (
              <button key={c.id} type="button" role="tab" aria-selected={tab === c.id} className={tab === c.id ? 'on' : ''} onClick={() => setTab(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          <ul className="options" role="group" aria-label={cat.label}>
            {cat.none && (
              <li>
                <button type="button" aria-pressed={pick[cat.id] === 'none'} className={pick[cat.id] === 'none' ? 'on' : ''} onClick={() => choose(cat, 'none')}>
                  <span className="none">none</span>
                </button>
              </li>
            )}
            {cat.options.map(([value, label]) => (
              <li key={value}>
                <button type="button" aria-pressed={pick[cat.id] === value} className={pick[cat.id] === value ? 'on' : ''} onClick={() => choose(cat, value)}>
                  {cat.icons ? <Icon id={value} /> : <span className="swatch" data-v={value} />}
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="says" aria-live="polite">
            {trait ? (
              <>
                <p className="kicker">this says</p>
                <h2>{trait.title}</h2>
                <p className="line">{trait.line}</p>
                {trait.body && <div className="body">{trait.body()}</div>}
              </>
            ) : (
              <>
                <p className="kicker">this says</p>
                <h2>Not much yet.</h2>
                <p className="line">Pick a laptop sticker, a book, some craft supplies. Hair and the plain tee are just for fun.</p>
              </>
            )}
          </div>

          {meaningful.length > 1 && (
            <div className="sofar">
              <p className="kicker">so far</p>
              <ul>
                {meaningful.map((k) => (
                  <li key={k}><button type="button" className={k === shown ? 'on' : ''} onClick={() => setFocus(k)}>{traits[k].title}</button></li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <section className="plain" id="plain" aria-label="The plain version">
        <h2>Or, the short version</h2>
        <div className="grid">
          <div>
            <h3>About</h3>
            {profile.about.map((t) => <p key={t}>{t}</p>)}
            <p className="dim">{profile.place}</p>
            <h3>Contact</h3>
            <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
          <div>
            <h3>Experience</h3>
            {experience.filter((e) => e.role).map((e) => <Job key={e.id} id={e.id} />)}
            <h3>Education</h3>
            <p><b>{education.degree}</b>, {education.school}</p>
            <h3>Courses</h3>
            <ul className="list">{certifications.map((c) => <li key={c.name}>{c.name}, {c.by} ({c.when})</li>)}</ul>
          </div>
          <div className="wide">
            <h3>Projects</h3>
            <div className="projgrid">{projects.map((p) => <ProjectBlock key={p.id} id={p.id} />)}</div>
            <h3>Things I&apos;ve made</h3>
            <CraftGrid />
            <h3>Volunteering</h3>
            <ul className="list">{volunteering.map((v) => <li key={v.name + v.where}><b>{v.name}</b>, {v.where} <span className="dim">({v.when})</span></li>)}</ul>
          </div>
        </div>
      </section>
    </div>
  );
}
