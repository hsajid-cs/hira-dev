import { useState } from 'react';
import {
  profile, projects, experience, education, skills, crafts, currently, likes,
} from '../data/portfolio';
import CraftArt from '../components/CraftArt';
import { featured, experiments, timeline, certifications, volunteering } from './layout';

const base = import.meta.env.BASE_URL;
const Chips = ({ list }) => <ul className="chips">{list.map((t) => <li key={t}>{t}</li>)}</ul>;
const Link = ({ href, children }) => (
  <a className="btn" href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">{children}</a>
);

function Project({ p }) {
  return (
    <div className="project">
      <h2>{p.name}</h2>
      <p className="sub">{p.full} · {p.year}</p>
      <p>{p.summary}</p>
      <h3>Problem</h3><p>{p.problem}</p>
      <h3>Approach</h3><p>{p.approach}</p>
      <h3>Result</h3><p>{p.result}</p>
      <h3>My part</h3><p>{p.contribution}</p>
      <h3>Built with</h3><Chips list={p.tags} />
      <div className="actions"><Link href={p.link.href}>{p.link.label}</Link></div>
    </div>
  );
}

/* The laptop: projects are files on a desktop, opened in a window. */
function LaptopScreen() {
  const [sel, setSel] = useState(null);
  const p = projects.find((x) => x.id === sel);
  return (
    <div className="screen">
      <div className="menubar"><span>projects</span><span className="dim">{featured.length} files</span></div>
      <div className="desktop">
        {!p && (
          <ul className="files">
            {featured.map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => setSel(f.id)}>
                  <svg viewBox="0 0 48 56" width="44" height="52" aria-hidden="true"><path d="M4 2 H30 L44 16 V54 H4 Z" fill="#fffdf6" stroke="#3a2a18" strokeWidth="2" strokeLinejoin="round" /><path d="M30 2 V16 H44" fill="#e9dcc0" stroke="#3a2a18" strokeWidth="2" strokeLinejoin="round" /><path d="M11 28 H37 M11 35 H37 M11 42 H28" stroke="#8a7a5a" strokeWidth="2" /></svg>
                  <b>{f.name}</b>
                  <span>{f.full}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {p && (
          <div className="window">
            <div className="titlebar"><button type="button" onClick={() => setSel(null)} aria-label="Back to files">‹ files</button><span>{p.name}</span></div>
            <div className="window-body"><Project p={p} /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function Drawers() {
  const [sel, setSel] = useState(null);
  const p = projects.find((x) => x.id === sel);
  if (p) {
    return (
      <>
        <button type="button" className="back" onClick={() => setSel(null)}>‹ back to the drawer</button>
        <Project p={p} />
      </>
    );
  }
  return (
    <>
      <h2>Drawers</h2>
      <p className="sub">Experiments and older projects. The ones that taught me the most.</p>
      <ul className="folders">
        {experiments.map((e) => (
          <li key={e.id}>
            <button type="button" onClick={() => setSel(e.id)}>
              <b>{e.name}</b>
              <span>{e.full} · {e.year}</span>
              <span className="dim">{e.summary}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

const bodies = {
  shelf: () => (
    <>
      <h2>Bookshelf</h2>
      <p className="sub">Things I&apos;m learning, and what I&apos;ve finished.</p>
      <h3>{education.degree}</h3>
      <p>{education.school}</p>
      <p>{education.body}</p>
      <h3>Courses</h3>
      <ul className="list">{certifications.map((c) => <li key={c.name}><b>{c.name}</b>, {c.by} <span className="dim">({c.when})</span></li>)}</ul>
      <h3>Tools on the shelf</h3>
      <Chips list={skills.map((s) => s.name)} />
      <h3>Right now</h3>
      <ul className="list">{currently.filter((c) => ['learning', 'reading'].includes(c.label)).map((c) => <li key={c.label}><b>{c.label}:</b> {c.text}</li>)}</ul>
    </>
  ),
  board: () => (
    <>
      <div className="about">
        <img src={`${base}${profile.photo}`} alt="Hira Sajid" width="150" height="150" />
        <div>
          <h2>About me</h2>
          <p className="sub">{profile.role} · {profile.place}</p>
        </div>
      </div>
      {profile.about.map((t) => <p key={t}>{t}</p>)}
      <h3>Things I like</h3>
      <ul className="list">{likes.map((l) => <li key={l.title}><b>{l.title}</b>, {l.note}</li>)}</ul>
    </>
  ),
  calendar: () => (
    <>
      <h2>Timeline</h2>
      <p className="sub">Work, projects, courses and volunteering, in the order they happened.</p>
      <ol className="timeline">
        {timeline.map((t) => (
          <li key={t.text} className={`k-${t.kind}`}>
            <span className="when">{t.range}</span>
            <span>{t.text}</span>
          </li>
        ))}
      </ol>
      <p className="legend"><i className="k-work" />work <i className="k-project" />projects <i className="k-learning" />courses <i className="k-volunteer" />volunteering</p>
    </>
  ),
  desk: () => (
    <>
      <h2>The desk</h2>
      <p className="sub">Where I&apos;ve worked.</p>
      {experience.map((e) => (
        <div className="job" key={e.id}>
          <h3>{e.role || e.company}</h3>
          <p className="sub">{e.role ? `${e.company} · ${e.dates} · ${e.place}` : 'Details still being added.'}</p>
          {e.points.length > 0 && <ul className="list">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>}
          {e.tags.length > 0 && <Chips list={e.tags} />}
        </div>
      ))}
    </>
  ),
  craft: () => (
    <>
      <h2>Craft corner</h2>
      <p className="sub">Things I&apos;ve made. This corner is the other half of the desk.</p>
      <ul className="frames">
        {crafts.map((c) => (
          <li key={c.id}>
            <div className="frame-art"><CraftArt craft={c} /></div>
            <b>{c.title}</b>
            <span>{c.note}</span>
          </li>
        ))}
      </ul>
    </>
  ),
  drawers: () => <Drawers />,
  notebook: () => <Resume />,
  phone: () => <PhoneBody />,
  laptop: () => <LaptopScreen />,
};

function Resume() {
  return (
    <div className="resume">
      <div className="resume-head">
        <h2>{profile.name}</h2>
        <button type="button" className="btn small no-print" onClick={() => window.print()}>Print / save PDF</button>
      </div>
      <p className="sub">{profile.role} · {profile.place}<br />{profile.email} · {profile.linkedin.replace('https://', '')} · {profile.github.replace('https://', '')}</p>
      <h3>Summary</h3><p>{profile.about[0]}</p>
      <h3>Experience</h3>
      {experience.filter((e) => e.role).map((e) => (
        <div key={e.id} className="job">
          <p><b>{e.role}</b>, {e.company} <span className="dim">· {e.dates}</span></p>
          <ul className="list">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      ))}
      <h3>Education</h3>
      <p><b>{education.degree}</b>, {education.school}</p>
      <h3>Projects</h3>
      <ul className="list">{projects.map((p) => <li key={p.id}><b>{p.name}</b> ({p.year}): {p.summary}</li>)}</ul>
      <h3>Skills</h3><p>{skills.map((s) => s.name).join(', ')}</p>
      <h3>Certificates</h3>
      <ul className="list">{certifications.map((c) => <li key={c.name}>{c.name}, {c.by}, {c.when}</li>)}</ul>
      <h3>Volunteering</h3>
      <ul className="list">{volunteering.map((v) => <li key={v.name + v.where}>{v.name}, {v.where} <span className="dim">({v.when})</span></li>)}</ul>
    </div>
  );
}

function PhoneBody() {
  const rows = [
    ['@', 'Email', profile.email, `mailto:${profile.email}`],
    ['in', 'LinkedIn', 'hsajid-cs', profile.linkedin],
    ['gh', 'GitHub', 'hsajid-cs', profile.github],
    ['rm', 'Rate My Dost', 'live demo', 'https://ratemydost.hirasajid.dev/'],
  ];
  return (
    <div className="phone-body">
      <p className="sub">Contacts</p>
      <h2>Hira Sajid</h2>
      <ul>
        {rows.map(([ic, name, val, href]) => (
          <li key={name}>
            <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              <span className="ic">{ic}</span>
              <span><b>{name}</b><br />{val}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Panel({ spot, onClose }) {
  const Body = bodies[spot.id];
  return (
    <aside className={`panel shell-${spot.shell}`} key={spot.id} role="dialog" aria-label={spot.label} tabIndex={-1}>
      <button type="button" className="x" onClick={onClose} aria-label="Back to the room">‹ room</button>
      <div className="panel-in"><Body /></div>
    </aside>
  );
}
