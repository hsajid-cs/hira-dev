import { projects, crafts, skills, currently, likes } from './data/portfolio';

export const BOARDS = [
  { id: 'built', title: "Things I've Built", blurb: 'software, models, a few late nights' },
  { id: 'made', title: "Things I've Made", blurb: 'with my hands, not my keyboard' },
  { id: 'learned', title: "Things I've Learned", blurb: 'the tools, roughly in order of how much I swear at them' },
  { id: 'liked', title: 'Things I Like', blurb: 'the stuff behind the stuff' },
  { id: 'now', title: 'Currently', blurb: 'this board changes. so does mine.' },
];

const projectLook = {
  panda: { ratio: '4 / 5', tone: 'cream', note: 'still working on this', tilt: 'l' },
  pact: { ratio: '3 / 4', tone: 'blush', note: '', tilt: 'r' },
  rmd: { ratio: '5 / 4', tone: 'sage', note: 'one of my favorite projects', tilt: 'r' },
  agritech: { ratio: '1 / 1', tone: 'mustard', note: '', tilt: 'l' },
  moodwave: { ratio: '16 / 10', tone: 'blue', note: '', tilt: 'r' },
  satiate: { ratio: '4 / 5', tone: 'cream', note: 'would build this differently now', tilt: 'l' },
};

const craftLook = {
  fest: { ratio: '4 / 3', tone: 'mustard' },
  eco: { ratio: '3 / 4', tone: 'sage' },
  society: { ratio: '1 / 1', tone: 'blush' },
  paper: { ratio: '4 / 5', tone: 'blue' },
  sketch: { ratio: '5 / 4', tone: 'cream' },
  handmade: { ratio: '1 / 1', tone: 'blush' },
};

const skillAliases = {
  Python: ['python'],
  PyTorch: ['pytorch'],
  TensorFlow: ['tensorflow'],
  'scikit-learn': ['scikit-learn'],
  React: ['react'],
  Flutter: ['flutter', 'dart'],
  Backend: ['fastapi', 'rest apis'],
  'AI / ML': ['tensorflow', 'pytorch', 'scikit-learn', 'opencv', 'librosa'],
  LLMs: ['openai', 'gemini api'],
  FAISS: [],
  Docker: [],
  'n8n / Make': [],
};

const skillTones = ['blue', 'blush', 'sage', 'mustard', 'cream'];
const skillSizes = ['m', 's', 'l', 's', 'm', 'm', 'l', 's', 'm', 's', 'l', 'm'];
const nowTones = ['mustard', 'blush', 'sage', 'blue', 'cream'];
const kindWords = { ai: 'ai ml machine learning', web: 'web frontend', mobile: 'mobile app' };

export const pins = [
  ...projects.map((p) => ({
    id: p.id,
    board: 'built',
    type: 'project',
    ...projectLook[p.id],
    project: p,
    keywords: `software projects code ${kindWords[p.kind]} ${p.tags.join(' ')}`,
  })),
  ...crafts.map((c) => ({
    id: c.id,
    board: 'made',
    type: 'craft',
    ...craftLook[c.id],
    note: c.id === 'sketch' ? 'this took way too long' : '',
    craft: c,
    keywords: 'craft crafts handmade art paper decor making projects',
  })),
  ...skills.map((s, i) => ({
    id: `skill-${i}`,
    board: 'learned',
    type: 'skill',
    tone: skillTones[i % skillTones.length],
    size: skillSizes[i],
    skill: s,
    usedIn: projects.filter((p) => p.tags.some((t) => (skillAliases[s.name] || []).includes(t))),
    keywords: `${s.group} tech skills software ${s.note}${/ml|llm/.test(s.group) ? ' ai' : ''}`,
  })),
  ...likes.map((l, i) => ({
    id: `like-${i}`,
    board: 'liked',
    type: 'like',
    tone: ['cream', 'blush', 'sage', 'blue', 'mustard'][i % 5],
    like: l,
    keywords: `${l.note} interests`,
  })),
  ...currently.map((c, i) => ({
    id: `now-${i}`,
    board: 'now',
    type: 'now',
    tone: nowTones[i % nowTones.length],
    now: c,
    keywords: `currently now ${c.label} ${/build|research|learn/.test(c.label) ? 'software ai projects' : ''} ${c.label === 'making' ? 'craft' : ''}`,
  })),
];

export function pinTitle(pin) {
  if (pin.project) return pin.project.name;
  if (pin.craft) return pin.craft.title;
  if (pin.skill) return pin.skill.name;
  if (pin.like) return pin.like.title;
  return `currently ${pin.now.label}`;
}

export function pinText(pin) {
  if (pin.project) return `${pin.project.full} ${pin.project.summary} ${pin.project.tags.join(' ')}`;
  if (pin.craft) return pin.craft.note;
  if (pin.skill) return pin.skill.note;
  if (pin.like) return pin.like.note;
  return pin.now.text;
}

export function matches(pin, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return true;
  const board = BOARDS.find((b) => b.id === pin.board).title;
  const hay = `${pinTitle(pin)} ${pinText(pin)} ${pin.keywords} ${board}`.toLowerCase();
  return tokens.every((t) => hay.includes(t));
}
