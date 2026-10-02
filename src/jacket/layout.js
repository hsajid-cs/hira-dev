import { projects, experience, education } from '../data/portfolio';

export const FULL = [0, 0, 640, 800];

const proj = (id) => projects.find((p) => p.id === id);
const exp = (id) => experience.find((e) => e.id === id);

// x, y: centre in jacket coordinates. w, h: patch size. r: tilt in degrees.
export const items = [
  { id: 'panda', type: 'project', art: 'panda', x: 258, y: 205, w: 112, h: 74, r: -2, label: 'PANDA', sub: 'Project', project: proj('panda') },
  { id: 'projects', type: 'projects', art: 'projects', x: 388, y: 205, w: 100, h: 76, r: 2, label: 'Projects', sub: "Things I've built" },
  { id: 'craft', type: 'craft', art: 'craft', x: 254, y: 322, w: 108, h: 108, r: -3, label: 'Crafts', sub: "Things I've made" },
  { id: 'uni', type: 'education', art: 'uni', x: 390, y: 312, w: 86, h: 96, r: 1.5, label: 'Education', sub: education.short },
  { id: 'code', type: 'software', art: 'code', x: 228, y: 414, w: 56, h: 56, r: 4, label: 'Software', sub: 'Development' },
  { id: 'book', type: 'learning', art: 'book', x: 288, y: 418, w: 54, h: 62, r: -4, label: 'Reading', sub: 'Learning' },
  { id: 'contact', type: 'contact', art: 'contact', x: 388, y: 432, w: 104, h: 92, r: 0, label: 'Contact', sub: 'Say hello' },

  { id: 'pact', type: 'project', art: 'pact', x: 139, y: 226, w: 76, h: 66, r: -6, label: 'Pact AI', sub: 'Project', project: proj('pact') },
  { id: 'rmd', type: 'project', art: 'rmd', x: 130, y: 322, w: 76, h: 68, r: 4, label: 'Rate My Dost', sub: 'Project', project: proj('rmd') },
  { id: 'agritech', type: 'project', art: 'agritech', x: 121, y: 418, w: 72, h: 72, r: -3, label: 'AgriTech Lens', sub: 'Project', project: proj('agritech') },
  { id: 'moodwave', type: 'project', art: 'moodwave', x: 112, y: 512, w: 84, h: 62, r: 5, label: 'MoodWave', sub: 'Project', project: proj('moodwave') },
  { id: 'satiate', type: 'project', art: 'satiate', x: 104, y: 602, w: 78, h: 66, r: -4, label: 'Satiate', sub: 'Project', project: proj('satiate') },

  { id: 'quest', type: 'badge', x: 502, y: 238, w: 66, h: 84, r: 5, band: '#c4452c', label: 'Quest', sub: 'Experience', exp: exp('quest') },
  { id: 'cogilent', type: 'badge', x: 512, y: 344, w: 66, h: 84, r: -4, band: '#334d6c', label: 'Cogilent', sub: 'Experience', exp: exp('cogilent') },
  { id: 'zoomiez', type: 'badge', x: 521, y: 450, w: 66, h: 84, r: 4, band: '#7f9a7a', label: 'Zoomiez.io', sub: 'Experience', exp: exp('zoomiez') },
  { id: 'hiskytech', type: 'badge', x: 530, y: 556, w: 66, h: 84, r: -3, band: '#d9a441', label: 'HiSkyTech', sub: 'Experience', exp: exp('hiskytech') },
];

export const byId = Object.fromEntries(items.map((i) => [i.id, i]));

// Spots where new patches get sewn on as sections are opened.
export const bonusSpots = [
  [236, 532, -8], [296, 580, 6], [248, 638, -4], [376, 524, 10], [412, 590, -6], [352, 646, 4], [232, 676, 8], [420, 662, -10],
];

// Little things hanging off the jacket. They only hold a line or two of text.
export const trinkets = [
  { id: 'keychain', x: 320, y: 150, lines: ['currently building…', 'AI automation workflows', 'at Quest'] },
  { id: 'tag', x: 96, y: 700, lines: ['currently learning…', 'Git, properly this time'] },
  { id: 'label', x: 320, y: 44, lines: ['currently reading…', 'something with no code in it'] },
  { id: 'notebook', x: 214, y: 716, lines: ['currently researching…', 'PANDA, EEG pain detection'] },
  { id: 'pin', x: 232, y: 98, lines: ['currently making…', 'paper things, between deadlines'] },
];
