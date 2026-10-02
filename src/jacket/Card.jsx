import { useEffect, useRef } from 'react';
import {
  profile, projects, education, certifications, volunteering, skills, crafts, currently,
} from '../data/portfolio';
import CraftArt from '../components/CraftArt';
import Mark from './Mark';
import { items } from './layout';

function Preview({ item }) {
  const pad = 14;
  const w = item.w + pad * 2;
  const h = item.h + pad * 2 + (item.type === 'badge' ? 14 : 0);
  return (
    <svg className="card-mark" viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`} aria-hidden="true">
      <g transform={`rotate(${item.r})`}><Mark item={item} /></g>
    </svg>
  );
}

const Chips = ({ list }) => <ul className="chips">{list.map((t) => <li key={t}>{t}</li>)}</ul>;
const Btn = ({ href, children }) => (
  <a className="btn" href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">{children}</a>
);

function Project({ p }) {
  return (
    <>
      <h2>{p.name}</h2>
      <p className="sub">{p.full} · {p.year}</p>
      <h3>Problem</h3><p>{p.problem}</p>
      <h3>Approach</h3><p>{p.approach}</p>
      <h3>Technologies</h3><Chips list={p.tags} />
      <h3>Results</h3><p>{p.result}</p>
      <h3>My part</h3><p>{p.contribution}</p>
      <div className="actions"><Btn href={p.link.href}>{p.link.label}</Btn></div>
    </>
  );
}

function Badge({ e }) {
  if (!e.role) {
    return (
      <>
        <h2>{e.company}</h2>
        <p className="sub">Experience</p>
        <p>The details for this one are still being sewn on.</p>
      </>
    );
  }
  return (
    <>
      <h2>{e.role}</h2>
      <p className="sub">{e.company} · {e.dates} · {e.place}</p>
      <h3>What I worked on</h3>
      <ul className="list">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
      <h3>Technologies</h3><Chips list={e.tags} />
    </>
  );
}

function Body({ item, onOpen }) {
  switch (item.type) {
    case 'project': return <Project p={item.project} />;
    case 'badge': return <Badge e={item.exp} />;
    case 'projects':
      return (
        <>
          <h2>Projects</h2>
          <p className="sub">Things I&apos;ve built. Each one also has its own patch on the sleeve.</p>
          <ul className="rows">
            {projects.map((p) => {
              const it = items.find((i) => i.id === p.id);
              return (
                <li key={p.id}>
                  <button type="button" onClick={() => onOpen(p.id)}>
                    <Preview item={it} />
                    <span><b>{p.name}</b><br />{p.summary}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      );
    case 'education':
      return (
        <>
          <h2>{education.degree}</h2>
          <p className="sub">{education.school} · {education.place}</p>
          <p>{education.body}</p>
          <h3>Beyond the classroom</h3>
          <ul className="list">
            {volunteering.map((v) => <li key={v.name + v.where}><b>{v.name}</b>, {v.where} <span className="dim">({v.when})</span></li>)}
          </ul>
        </>
      );
    case 'craft':
      return (
        <>
          <h2>Things I&apos;ve made</h2>
          <p className="sub">Crafting is not a side note here. It is why the portfolio looks the way it does.</p>
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
      );
    case 'software':
      return (
        <>
          <h2>Software development</h2>
          <p className="sub">{profile.about[0]}</p>
          <ul className="tabs">
            {skills.map((s) => <li key={s.name}><b>{s.name}</b><span>{s.note}</span></li>)}
          </ul>
          <h3>Right now</h3>
          <ul className="list">{currently.slice(0, 3).map((c) => <li key={c.label}><b>{c.label}:</b> {c.text}</li>)}</ul>
        </>
      );
    case 'learning':
      return (
        <>
          <h2>Reading &amp; learning</h2>
          <p className="sub">Courses finished, and what is on the pile.</p>
          <ul className="list">
            {certifications.map((c) => <li key={c.name}><b>{c.name}</b>, {c.by} <span className="dim">({c.when})</span></li>)}
          </ul>
          <h3>Currently</h3>
          <ul className="list">{currently.filter((c) => ['reading', 'learning'].includes(c.label)).map((c) => <li key={c.label}><b>{c.label}:</b> {c.text}</li>)}</ul>
        </>
      );
    default:
      return (
        <>
          <h2>Say hello</h2>
          <p className="sub">{profile.place}</p>
          <div className="actions col">
            <Btn href={`mailto:${profile.email}`}>{profile.email}</Btn>
            <Btn href={profile.linkedin}>LinkedIn</Btn>
            <Btn href={profile.github}>GitHub</Btn>
            <Btn href="https://ratemydost.hirasajid.dev/">Rate My Dost, live</Btn>
          </div>
        </>
      );
  }
}

export default function Card({ item, onClose, onOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    if (ref.current) ref.current.scrollTop = 0;
  }, [item.id]);

  return (
    <aside className="card" key={item.id} ref={ref} tabIndex={-1} role="dialog" aria-label={item.label}>
      <button type="button" className="x" onClick={onClose} aria-label="Close and go back to the jacket">×</button>
      <div className="card-in">
        <Preview item={item} />
        <Body item={item} onOpen={onOpen} />
      </div>
    </aside>
  );
}
