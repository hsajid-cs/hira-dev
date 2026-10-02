import { projects, experience, certifications, volunteering } from '../data/portfolio';

export const FULL = [0, 0, 1000, 700];

// Things in the room you can open. x,y,w,h is the box the camera moves toward.
export const spots = [
  { id: 'shelf', x: 66, y: 62, w: 190, h: 396, label: 'Bookshelf', sub: "Things I'm learning", shell: 'paper', focus: { x: 66, y: 62, w: 190, h: 230 } },
  { id: 'board', x: 556, y: 62, w: 214, h: 138, label: 'Photo board', sub: 'About me', shell: 'paper' },
  { id: 'calendar', x: 806, y: 70, w: 84, h: 108, label: 'Calendar', sub: 'Timeline', shell: 'paper' },
  { id: 'laptop', x: 446, y: 272, w: 160, h: 82, label: 'Laptop', sub: "Things I've built", shell: 'screen' },
  { id: 'notebook', x: 332, y: 332, w: 92, h: 24, label: 'Notebook', sub: 'Resume', shell: 'notebook' },
  { id: 'phone', x: 648, y: 312, w: 38, h: 42, label: 'Phone', sub: 'Contact', shell: 'phone' },
  { id: 'desk', x: 310, y: 352, w: 290, h: 110, label: 'Desk', sub: "Where I've worked", shell: 'paper' },
  { id: 'drawers', x: 590, y: 370, w: 196, h: 92, label: 'Drawers', sub: 'Experiments', shell: 'paper' },
  { id: 'craft', x: 782, y: 214, w: 176, h: 400, label: 'Craft corner', sub: "Things I've made", shell: 'paper', focus: { x: 766, y: 468, w: 192, h: 160 } },
];
export const byId = Object.fromEntries(spots.map((s) => [s.id, s]));

// The camera stops on a small phone screen: three spots along the room.
export const stations = [
  { id: 'left', label: 'bookshelf', cx: 250 },
  { id: 'desk', label: 'desk', cx: 520 },
  { id: 'right', label: 'craft corner', cx: 800 },
];

// Objects that only say something.
export const trinkets = [
  { id: 'sticky', x: 744, y: 150, w: 46, h: 48, lines: ['currently learning…', 'Git, properly this time'] },
  { id: 'screen', x: 591, y: 266, w: 30, h: 28, lines: ['currently building…', 'AI automation workflows', 'at Quest'] },
  { id: 'book', x: 470, y: 596, lines: ['currently reading…', 'something with no code in it'] },
  { id: 'hoop', x: 790, y: 560, lines: ['currently making…', 'paper things, between deadlines'] },
];

export const featured = projects.filter((p) => ['panda', 'pact', 'rmd'].includes(p.id));
export const experiments = projects.filter((p) => ['agritech', 'moodwave', 'satiate'].includes(p.id));

// Everything dated, in order, for the calendar.
const q = experience.find((e) => e.id === 'quest');
const z = experience.find((e) => e.id === 'zoomiez');
export const timeline = [
  { when: '2020-08', text: 'Web content writer at Rizq', kind: 'work', range: 'Aug 2020 – Feb 2021' },
  { when: '2023-05', text: 'Satiate: 10 pages for donors and NGOs', kind: 'project', range: '2023' },
  { when: '2023-12', text: 'Registration volunteer, SGA SEECS', kind: 'volunteer', range: 'Dec 2023' },
  { when: '2024-04', text: 'Decor executive, NEC Eco Carnival', kind: 'volunteer', range: 'Apr 2024' },
  { when: '2024-05', text: 'Usher, SGA SEECS', kind: 'volunteer', range: 'May 2024' },
  { when: '2024-06', text: 'PANDA: EEG-based neonatal pain detection', kind: 'project', range: '2024 – now' },
  { when: '2024-07', text: 'Supervised Machine Learning, Coursera', kind: 'learning', range: 'Jul 2024' },
  { when: '2024-09', text: 'Decor executive, NCSC, NUST', kind: 'volunteer', range: 'Sep 2024 – May 2025' },
  { when: '2024-10', text: 'MoodWave, AgriTech Lens and Pact AI', kind: 'project', range: '2024' },
  { when: '2024-12', text: 'Advanced Learning Algorithms, Coursera', kind: 'learning', range: 'Dec 2024' },
  { when: '2025-02', text: 'Decor executive, NUST Cultural Fest', kind: 'volunteer', range: 'Feb 2025' },
  { when: '2025-03', text: 'Volunteer, Shaukat Khanum Hospital', kind: 'volunteer', range: 'Mar 2025' },
  { when: '2025-05', text: 'Rate My Dost: a social voting platform', kind: 'project', range: '2025' },
  { when: '2025-06', text: `${z.role}, ${z.company}`, kind: 'work', range: z.dates },
  { when: '2025-07', text: 'Deep Learning Specialization, Coursera', kind: 'learning', range: 'Jun 2025' },
  { when: '2026-01', text: `${q.role}, ${q.company}`, kind: 'work', range: 'Jan 2026 – now' },
];

export { certifications, volunteering };
