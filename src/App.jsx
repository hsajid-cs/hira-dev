import { useCallback, useMemo, useState } from 'react';
import { profile, experience, education, certifications, volunteering } from './data/portfolio';
import { BOARDS, pins, matches } from './pins';
import Pin from './components/Pin';
import Detail from './components/Detail';

const base = import.meta.env.BASE_URL;

export default function App() {
  const [query, setQuery] = useState('');
  const [board, setBoard] = useState('all');
  const [open, setOpen] = useState(null);

  const visible = useMemo(
    () => pins.filter((p) => (board === 'all' || p.board === board) && matches(p, query)),
    [query, board],
  );
  const openPin = useCallback((pin, el) => setOpen({ pin, el }), []);
  const close = useCallback(() => setOpen(null), []);

  const shown = BOARDS.filter((b) => visible.some((p) => p.board === b.id));

  return (
    <>
      <header className="top">
        <div className="profile">
          <figure className="polaroid">
            <img src={`${base}${profile.photo}`} alt="Hira Sajid" width="160" height="160" />
          </figure>
          <div className="who">
            <h1>HIRA SAJID</h1>
            <p className="role">{profile.role}</p>
            <p className="intro">{profile.intro}</p>
            <nav className="links" aria-label="Sections">
              <a href="#boards">Boards</a>
              <a href="#about">About &amp; experience</a>
              <a href="#hello">Say hi</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="bar">
        <label className="search">
          <span className="sr">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Hira's portfolio..."
          />
        </label>
        <div className="chips" role="tablist" aria-label="Boards">
          {[{ id: 'all', title: 'Everything' }, ...BOARDS].map((b) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={board === b.id}
              className={board === b.id ? 'on' : ''}
              onClick={() => setBoard(b.id)}
            >
              {b.title.replace("Things I've ", '').replace('Things I ', '')}
            </button>
          ))}
        </div>
      </div>

      <main id="boards">
        {shown.length === 0 && (
          <p className="empty">Nothing pinned for “{query}” yet. Try “AI”, “craft”, “software” or “projects”.</p>
        )}
        {shown.map((b) => (
          <section className="board" key={b.id} aria-labelledby={`b-${b.id}`}>
            <div className="board-head">
              <h2 id={`b-${b.id}`}>{b.title}</h2>
              <p className="hand">{b.blurb}</p>
            </div>
            <div className={`masonry m-${b.id}`}>
              {visible.filter((p) => p.board === b.id).map((p, i) => (
                <Pin key={p.id} pin={p} index={i} onOpen={openPin} />
              ))}
            </div>
          </section>
        ))}

        <section className="useful" id="about" aria-label="About and experience">
          <div className="scrap about">
            <h2>About</h2>
            {profile.about.map((t) => <p key={t}>{t}</p>)}
            <p className="hand">{profile.place}</p>
          </div>
          <div className="scrap work">
            <h2>Experience</h2>
            <ol>
              {experience.filter((e) => e.role).map((e) => (
                <li key={e.id}>
                  <h3>{e.role}, {e.company}</h3>
                  <p className="when">{e.dates}</p>
                  <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </li>
              ))}
              <li>
                <h3>{education.degree}, {education.short}</h3>
                <p className="when">{education.school}</p>
                <p>{education.body}</p>
              </li>
            </ol>
          </div>
          <div className="scrap extra">
            <h2>Certificates</h2>
            <ul className="plain">
              {certifications.map((c) => <li key={c.name}><b>{c.name}</b><br />{c.by} · {c.when}</li>)}
            </ul>
            <h2>Volunteering</h2>
            <ul className="plain">
              {volunteering.map((v) => <li key={v.name + v.where}><b>{v.name}</b>, {v.where}<br /><span>{v.when}</span></li>)}
            </ul>
          </div>
        </section>
      </main>

      <footer className="hello" id="hello">
        <p className="hand">want to make something together?</p>
        <h2>Say hi</h2>
        <div className="hello-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

      {open && <Detail pin={open.pin} origin={open.el} onClose={close} />}
    </>
  );
}
