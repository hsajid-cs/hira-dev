import { useEffect, useRef } from 'react';
import { profile, education, certifications, volunteering, crafts, likes, currently } from '../data/portfolio';
import CraftArt from './CraftArt';
import Scene from './Scenes';

const Chips = ({ list }) => <ul className="chips">{list.map((t) => <li key={t}>{t}</li>)}</ul>;
const Link = ({ href, children }) => (
  <a className="btn" href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">{children}</a>
);

function Info({ shot }) {
  if (shot.project) {
    const p = shot.project;
    return (
      <>
        <h2>{p.name}</h2>
        <p className="sub">{p.full} · {p.year}</p>
        <p>{p.summary}</p>
        <h3>The problem</h3><p>{p.problem}</p>
        <h3>What I did</h3><p>{p.approach}</p>
        <h3>How it went</h3><p>{p.result}</p>
        <h3>My part</h3><p>{p.contribution}</p>
        <Chips list={p.tags} />
        <div className="actions"><Link href={p.link.href}>{p.link.label} ↗</Link></div>
      </>
    );
  }
  if (shot.exp) {
    const e = shot.exp;
    return (
      <>
        <h2>{e.role}</h2>
        <p className="sub">{e.company} · {e.dates} · {e.place}</p>
        <h3>What I worked on</h3>
        <ul className="list">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
        <Chips list={e.tags} />
      </>
    );
  }
  if (shot.edu) {
    return (
      <>
        <h2>{education.degree}</h2>
        <p className="sub">{education.school} · {education.place}</p>
        <p>{education.body}</p>
        <h3>Courses</h3>
        <ul className="list">{certifications.map((c) => <li key={c.name}><b>{c.name}</b>, {c.by} <span className="dim">({c.when})</span></li>)}</ul>
        <h3>Beyond the classroom</h3>
        <ul className="list">{volunteering.map((v) => <li key={v.name + v.where}><b>{v.name}</b>, {v.where} <span className="dim">({v.when})</span></li>)}</ul>
      </>
    );
  }
  if (shot.id === 'about') {
    return (
      <>
        <h2>Hira Sajid</h2>
        <p className="sub">{profile.role} · {profile.place}</p>
        {profile.about.map((t) => <p key={t}>{t}</p>)}
        <h3>Things I like</h3>
        <ul className="list">{likes.map((l) => <li key={l.title}><b>{l.title}</b>, {l.note}</li>)}</ul>
        <h3>Right now</h3>
        <ul className="list">{currently.map((c) => <li key={c.label}><b>{c.label}:</b> {c.text}</li>)}</ul>
      </>
    );
  }
  if (shot.id === 'crafts') {
    return (
      <>
        <h2>Made by hand</h2>
        <p className="sub">Crafting is half the reason this site is a pile of photographs.</p>
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
  }
  return (
    <>
      <h2>Say hi</h2>
      <p className="sub">{profile.place}</p>
      <div className="actions col">
        <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
        <Link href={profile.linkedin}>LinkedIn</Link>
        <Link href={profile.github}>GitHub</Link>
        <Link href="https://ratemydost.hirasajid.dev/">Rate My Dost, live</Link>
      </div>
    </>
  );
}

export default function Back({ shot, origin, onClose }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    const el = panel.current;
    if (el && origin) {
      const from = origin.getBoundingClientRect();
      const to = el.getBoundingClientRect();
      el.style.setProperty('--dx', `${from.left + from.width / 2 - (to.left + to.width / 2)}px`);
      el.style.setProperty('--dy', `${from.top + from.height / 2 - (to.top + to.height / 2)}px`);
      el.style.setProperty('--s', Math.min(0.9, Math.max(0.2, from.width / to.width)).toFixed(2));
    }
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      origin?.focus?.({ preventScroll: true });
    };
  }, [onClose, origin]);

  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="back" ref={panel} role="dialog" aria-modal="true" aria-label={shot.caption}>
        <button type="button" className="close" onClick={onClose} ref={closeBtn} aria-label="Put the photo back">×</button>
        <figure className="back-photo">
          <div className="shot"><Scene id={shot.scene} /></div>
          <figcaption>{shot.caption}</figcaption>
        </figure>
        <div className="back-info"><Info shot={shot} /></div>
      </div>
    </div>
  );
}
