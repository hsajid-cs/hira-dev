import { projects, experience, education } from './data/portfolio';

// The roll of film, in the order the shutter takes them.
const proj = (id) => projects.find((p) => p.id === id);
const exp = (id) => experience.find((e) => e.id === id);

export const roll = [
  { id: 'about', group: 'about', caption: 'me, mostly', scene: 'about' },
  { id: 'panda', group: 'projects', caption: 'PANDA', scene: 'panda', project: proj('panda') },
  { id: 'pact', group: 'projects', caption: 'Pact AI', scene: 'pact', project: proj('pact') },
  { id: 'rmd', group: 'projects', caption: 'Rate My Dost', scene: 'rmd', project: proj('rmd') },
  { id: 'agritech', group: 'projects', caption: 'AgriTech Lens', scene: 'agritech', project: proj('agritech') },
  { id: 'moodwave', group: 'projects', caption: 'MoodWave', scene: 'moodwave', project: proj('moodwave') },
  { id: 'satiate', group: 'projects', caption: 'Satiate', scene: 'satiate', project: proj('satiate') },
  { id: 'quest', group: 'experience', caption: 'Quest', scene: 'quest', exp: exp('quest') },
  { id: 'zoomiez', group: 'experience', caption: 'Zoomiez', scene: 'zoomiez', exp: exp('zoomiez') },
  { id: 'nust', group: 'education', caption: 'NUST', scene: 'nust', edu: education },
  { id: 'crafts', group: 'crafts', caption: 'made by hand', scene: 'crafts' },
  { id: 'contact', group: 'contact', caption: 'say hi', scene: 'contact' },
];

export const groups = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'crafts', label: 'Crafts' },
  { id: 'contact', label: 'Contact' },
];
