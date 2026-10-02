import { useCallback, useEffect, useRef, useState } from 'react';
import {
  profile, projects, experience, education, certifications, volunteering,
  skills, crafts, currently, likes,
} from './data/portfolio';
import Origami from './components/Origami';
import CraftArt from './components/CraftArt';

const base = import.meta.env.BASE_URL;

const SECTIONS = [
  { id: 'about', kind: 'flower', label: 'About' },
  { id: 'projects', kind: 'box', label: 'Projects' },
  { id: 'experience', kind: 'accordion', label: 'Experience' },
  { id: 'skills', kind: 'crane', label: 'Skills & interests' },
  { id: 'contact', kind: 'envelope', label: 'Contact' },
];

function About() {
  return (
    <div className="about">
      <figure className="snap">
        <img src={`${base}${profile.photo}`} alt="Hira Sajid" width="220" height="220" />
      </figure>
      <div>
        {profile.about.map((t) => <p key={t}>{t}</p>)}
        <p className="pencil">{profile.place}</p>
      </div>
    </div>
  );
}

function Projects() {
  const [id, setId] = useState(null);
  const p = projects.find((x) => x.id === id);

  if (p) {
    return (
      <div key={p.id}>
        <button type="button" className="back" onClick={() => setId(null)}>← fold it back</button>
        <div className="trifold">
          <section className="tf tf-left">
            <h4>The problem</h4>
            <p>{p.problem}</p>
            <h4>What I did</h4>
            <p>{p.approach}</p>
          </section>
          <section className="tf tf-mid">
            <p className="kicker">{p.year}</p>
            <h3>{p.name}</h3>
            <p className="full">{p.full}</p>
            <p>{p.summary}</p>
            <p className="result"><b>How it went</b> {p.result}</p>
          </section>
          <section className="tf tf-right">
            <h4>My part</h4>
            <p>{p.contribution}</p>
            <h4>Made with</h4>
            <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className="seal" href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label} ↗</a>
          </section>
        </div>
      </div>
    );
  }

  return (
    <ul className="pieces">
      {projects.map((x, i) => (
        <li key={x.id} className={`piece piece-${i % 4}`} style={{ '--i': i }}>
          <button type="button" onClick={() => setId(x.id)}>
            <span className="kicker">{x.year}</span>
            <strong>{x.name}</strong>
            <span className="blurb">{x.summary}</span>
            <span className="chips">{x.tags.map((t) => <i key={t}>{t}</i>)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Experience() {
  const folds = [
    ...experience.filter((e) => e.role).map((e) => ({
      key: e.id, title: e.role, where: `${e.company} · ${e.dates}`, body: e.points, tags: e.tags,
    })),
    { key: 'edu', title: education.degree, where: education.school, body: [education.body], tags: [] },
    {
      key: 'certs', title: 'Certificates', where: 'Coursera',
      body: certifications.map((c) => `${c.name}, ${c.when}`), tags: [],
    },
    {
      key: 'vol', title: 'Volunteering', where: 'campus and community',
      body: volunteering.map((v) => `${v.name}, ${v.where} (${v.when})`), tags: [],
    },
  ];
  const [open, setOpen] = useState('quest');

  return (
    <ol className="accordion">
      {folds.map((f, i) => (
        <li key={f.key} className={`fold ${i % 2 ? 'odd' : ''} ${open === f.key ? 'open' : ''}`} style={{ '--i': i }}>
          <button type="button" aria-expanded={open === f.key} onClick={() => setOpen(open === f.key ? null : f.key)}>
            <span className="fold-title">{f.title}</span>
            <span className="fold-where">{f.where}</span>
          </button>
          <div className="fold-body">
            <div>
              <ul>{f.body.map((b) => <li key={b}>{b}</li>)}</ul>
              {f.tags.length > 0 && <ul className="chips">{f.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Skills() {
  return (
    <div className="skills">
      <h3>Things I work with</h3>
      <ul className="tabs">
        {skills.map((s, i) => (
          <li key={s.name} className={`tab tab-${i % 4}`}>
            <b>{s.name}</b>
            <span>{s.note}</span>
          </li>
        ))}
      </ul>

      <h3 className="made-h">Things I&apos;ve made</h3>
      <p className="lede">I fold, cut and decorate as often as I write code. Event décor for three campus events, paper work, and a sketchbook that never quite gets finished.</p>
      <ul className="frames">
        {crafts.map((c, i) => (
          <li key={c.id} className={`frame frame-${i % 3}`}>
            <div className="frame-art"><CraftArt craft={c} /></div>
            <b>{c.title}</b>
            <span>{c.note}</span>
          </li>
        ))}
      </ul>

      <div className="two">
        <div>
          <h3>Right now</h3>
          <ul className="plain">
            {currently.map((c) => <li key={c.label}><span className="pencil">{c.label}</span> {c.text}</li>)}
          </ul>
        </div>
        <div>
          <h3>Things I like</h3>
          <ul className="plain">
            {likes.map((l) => <li key={l.title}><b>{l.title}</b>, {l.note}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="envelope">
      <div className="env-flap" />
      <div className="letter">
        <p className="pencil">drop me a line</p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://ratemydost.hirasajid.dev/" target="_blank" rel="noopener noreferrer">Rate My Dost, live</a>
      </div>
      <div className="env-front" />
    </div>
  );
}

const views = { about: About, projects: Projects, experience: Experience, skills: Skills, contact: Contact };

export default function App() {
  const [openId, setOpenId] = useState(null);
  const [closing, setClosing] = useState(false);
  const [seen, setSeen] = useState([]);
  const panelRef = useRef(null);

  const fold = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setOpenId(null); setClosing(false); }, 240);
  }, []);

  const toggle = (id) => {
    if (openId === id && !closing) return fold();
    setClosing(false);
    setOpenId(id);
    setSeen((s) => (s.includes(id) ? s : [...s, id]));
  };

  useEffect(() => {
    if (openId) panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [openId]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && openId && fold();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openId, fold]);

  const View = openId && views[openId];
  const current = SECTIONS.find((s) => s.id === openId);

  return (
    <main className="sheet">
      <header className="hero">
        <h1>HIRA SAJID</h1>
        <p className="sub">Software Developer + Maker</p>
        <p className="pencil hint">one sheet of paper. start anywhere, every fold opens something.</p>
      </header>

      <nav className="objects" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`obj ${openId === s.id ? 'on' : ''}`}
            aria-expanded={openId === s.id}
            aria-controls="panel"
            onClick={() => toggle(s.id)}
          >
            <Origami kind={s.kind} done={seen.includes(s.id)} />
            <span>{s.label}</span>
          </button>
        ))}
      </nav>

      {View && (
        <section id="panel" ref={panelRef} className={`panel ${closing ? 'closing' : ''}`} key={openId} aria-label={current.label}>
          <div className="panel-head">
            <h2>{current.label}</h2>
            <button type="button" className="close" onClick={fold}>fold away</button>
          </div>
          <View />
        </section>
      )}

      <footer className="shelf" aria-label="Folded so far">
        <p className="pencil">{seen.length === SECTIONS.length ? 'all folded. thanks for looking.' : 'folded so far'}</p>
        <div className="slots">
          {SECTIONS.map((s) => (
            <span key={s.id} className={`slot ${seen.includes(s.id) ? 'full' : ''}`}>
              {seen.includes(s.id) && <Origami kind={s.kind} done size={46} />}
            </span>
          ))}
        </div>
      </footer>
    </main>
  );
}
