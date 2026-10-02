import {
  profile, projects, experience, education, certifications, volunteering, skills, crafts, currently,
} from './data/portfolio';
import CraftArt from './components/CraftArt';

const Chips = ({ list }) => <ul className="chips">{list.map((t) => <li key={t}>{t}</li>)}</ul>;
const Link = ({ href, children }) => <a className="btn" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;

export function ProjectBlock({ id }) {
  const p = projects.find((x) => x.id === id);
  return (
    <div className="proj">
      <h4>{p.name} <span>{p.year}</span></h4>
      <p className="dim">{p.full}</p>
      <p>{p.summary}</p>
      <p><b>My part:</b> {p.contribution}</p>
      <Chips list={p.tags} />
      <Link href={p.link.href}>{p.link.label} ↗</Link>
    </div>
  );
}

export function Job({ id }) {
  const e = experience.find((x) => x.id === id);
  return (
    <div className="proj">
      <h4>{e.role} <span>{e.company}</span></h4>
      <p className="dim">{e.dates} · {e.place}</p>
      <ul className="list">{e.points.map((x) => <li key={x}>{x}</li>)}</ul>
      <Chips list={e.tags} />
    </div>
  );
}

export function CraftGrid({ kinds }) {
  const list = kinds ? crafts.filter((c) => kinds.includes(c.kind)) : crafts;
  return (
    <ul className="frames">
      {list.map((c) => (
        <li key={c.id}>
          <div className="frame-art"><CraftArt craft={c} /></div>
          <b>{c.title}</b>
          <span>{c.note}</span>
        </li>
      ))}
    </ul>
  );
}

const Courses = () => (
  <ul className="list">{certifications.map((c) => <li key={c.name}><b>{c.name}</b>, {c.by} <span className="dim">({c.when})</span></li>)}</ul>
);
const Vol = ({ match }) => (
  <ul className="list">
    {volunteering.filter((v) => !match || match.test(v.name)).map((v) => <li key={v.name + v.where}><b>{v.name}</b>, {v.where} <span className="dim">({v.when})</span></li>)}
  </ul>
);
const skillsOf = (groups) => skills.filter((s) => groups.includes(s.group)).map((s) => s.name);

// Every choice: what it is, the short answer, and the proof.
export const traits = {
  'hair-long': { title: 'Just hair', line: 'Not everything has to mean something.', body: null },
  'hair-bun': { title: 'Just hair', line: 'Not everything has to mean something.', body: null },
  'hair-braid': { title: 'Just hair', line: 'Not everything has to mean something.', body: null },
  'hair-bob': { title: 'Just hair', line: 'Not everything has to mean something.', body: null },
  'outfit-tee': { title: 'Plain tee', line: 'Nothing to see here yet. Try the other outfits.', body: null },
  'outfit-lanyard': {
    title: 'Work', line: 'Quest today, Zoomiez.io before that.',
    body: () => (<><Job id="quest" /><Job id="zoomiez" /></>),
  },
  'outfit-campus': {
    title: 'Education', line: `${education.degree}, ${education.short}.`,
    body: () => (<><p>{education.school}</p><p>{education.body}</p></>),
  },
  'outfit-volunteer': {
    title: 'Volunteering', line: 'Hospital shifts, registration desks, ushering.',
    body: () => <Vol match={/Volunteer|Usher|Writer/} />,
  },
  'outfit-apron': {
    title: 'Event décor', line: 'Decor executive for three campus events.',
    body: () => (<><Vol match={/Decor/} /><CraftGrid kinds={['decor', 'paper', 'thread']} /></>),
  },
  'acc-headphones': {
    title: 'Sound', line: 'MoodWave: emotion from speech.',
    body: () => <ProjectBlock id="moodwave" />,
  },
  'acc-glasses': {
    title: 'Research', line: 'PANDA is still going.',
    body: () => <ProjectBlock id="panda" />,
  },
  'acc-pins': {
    title: 'Courses', line: 'Three Coursera courses and counting.',
    body: () => <Courses />,
  },
  'sticker-code': {
    title: 'Software development', line: 'Full-stack apps people actually use.',
    body: () => (
      <>
        <p>{profile.about[0]}</p>
        <Chips list={skillsOf(['web', 'ops', 'language'])} />
        <ProjectBlock id="rmd" />
        <ProjectBlock id="satiate" />
      </>
    ),
  },
  'sticker-neural': {
    title: 'AI / ML', line: 'Models on EEG, images and audio, plus LLM pipelines.',
    body: () => (
      <>
        <Chips list={skillsOf(['ml', 'llm'])} />
        <ProjectBlock id="panda" />
        <ProjectBlock id="agritech" />
        <ProjectBlock id="moodwave" />
      </>
    ),
  },
  'sticker-phone': {
    title: 'Mobile', line: 'Pact AI, in Flutter.',
    body: () => <ProjectBlock id="pact" />,
  },
  'craft-brush': {
    title: 'Creative stuff', line: 'Sketches, colour, and things made for no reason.',
    body: () => <CraftGrid kinds={['sketch', 'flower']} />,
  },
  'craft-scissors': {
    title: 'Paper & cutting', line: 'Folded, cut, glued.',
    body: () => <CraftGrid kinds={['crane', 'paper', 'decor']} />,
  },
  'craft-thread': {
    title: 'Handmade', line: 'Thread, patience and small gifts.',
    body: () => <CraftGrid kinds={['thread', 'flower']} />,
  },
  'craft-paper': {
    title: 'Origami', line: 'Paper, folded until it is something else.',
    body: () => <CraftGrid kinds={['crane', 'paper']} />,
  },
  'books-stack': {
    title: 'Reading', line: 'Courses finished, a pile still to go.',
    body: () => (<><Courses /><p className="dim">{currently.find((c) => c.label === 'reading').label}: {currently.find((c) => c.label === 'reading').text}</p></>),
  },
  'books-notebook': {
    title: 'Writing', line: 'Documentation, web content, notes to self.',
    body: () => (
      <>
        <p>I like documentation someone can follow, and I have written web content for money (Rizq, 2020 to 2021).</p>
        <Vol match={/Writer/} />
      </>
    ),
  },
};

export const categories = [
  { id: 'hair', label: 'Hair', options: [['long', 'Long & loose'], ['bun', 'Messy bun'], ['braid', 'Side braid'], ['bob', 'Bob']] },
  { id: 'outfit', label: 'Outfit', options: [['tee', 'Plain tee'], ['lanyard', 'Lanyard'], ['campus', 'Campus jacket'], ['volunteer', 'Volunteer tee'], ['apron', 'Craft apron']] },
  { id: 'accessory', label: 'Accessories', none: true, prefix: 'acc', options: [['headphones', 'Headphones'], ['glasses', 'Glasses'], ['pins', 'Pin badges']] },
  { id: 'sticker', label: 'Laptop sticker', none: true, icons: true, options: [['code', 'Code'], ['neural', 'Neural net'], ['phone', 'Phone']] },
  { id: 'craft', label: 'Craft supplies', none: true, icons: true, options: [['brush', 'Paintbrush'], ['scissors', 'Scissors'], ['thread', 'Thread'], ['paper', 'Paper']] },
  { id: 'books', label: 'Books', none: true, icons: true, options: [['stack', 'Book stack'], ['notebook', 'Notebook']] },
];

export const traitKey = (cat, value) => `${cat.prefix || cat.id}-${value}`;
