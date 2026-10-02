import { art, Badge } from './patches';

const badgeNames = { Quest: 'Quest', Cogilent: 'Cogilent', 'Zoomiez.io': 'Zoomiez', HiSkyTech: 'HiSkyTech' };
const badgeRoles = { quest: 'JR. SW ENGINEER', zoomiez: 'AI INTERN' };

// The artwork of one patch, centred on (0,0). Used on the jacket and again at the top of its card.
export default function Mark({ item }) {
  if (item.type === 'badge') {
    return <Badge w={item.w} h={item.h} name={badgeNames[item.exp.company] || item.exp.company} role={badgeRoles[item.id]} band={item.band} />;
  }
  const Art = art[item.art];
  return <Art w={item.w} h={item.h} />;
}
