// Every patch is drawn around (0,0). Felt base, merrowed edge, a ring of running stitch, then the motif.
const CREAM = '#efe3c6';

function Felt({ w, h, fill, edge = CREAM, rx = 6, ring = edge }) {
  return (
    <>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={rx} fill={fill} stroke={edge} strokeWidth="3.4" />
      <rect x={-w / 2 + 5} y={-h / 2 + 5} width={w - 10} height={h - 10} rx={Math.max(rx - 2, 1)} fill="none" stroke={ring} strokeWidth="1" strokeDasharray="3.2 2.6" opacity=".75" />
    </>
  );
}

const thread = (c, w = 2.2) => ({ stroke: c, strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' });
const label = (y, text, size = 9, fill = CREAM, extra = {}) => (
  <text y={y} textAnchor="middle" fontSize={size} fill={fill} className="stitch-text" {...extra}>{text}</text>
);

export const art = {
  panda: ({ w, h }) => (
    <>
      <Felt w={w} h={h} fill="#263552" />
      <path d="M-44 2 L-34 2 L-30 -16 L-24 16 L-18 -22 L-12 12 L-8 2 L2 2 L8 -9 L14 7 L18 2 L44 2" {...thread('#86d1a4', 2.6)} strokeDasharray="7 1.6" />
      <path d="M-44 14 H44" {...thread('#e9dcc0', 0.8)} opacity=".35" />
      {label(26, 'PANDA', 10, CREAM, { letterSpacing: 2.5 })}
    </>
  ),
  projects: ({ w, h }) => (
    <>
      <Felt w={w} h={h} fill="#d9a441" edge="#f4e4b4" ring="#6b4a12" />
      <rect x="-26" y="-26" width="52" height="34" rx="3" fill="#2b2926" stroke="#6b4a12" strokeWidth="2" />
      <text y="-3" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f0d58a" fontFamily="monospace">&lt;/&gt;</text>
      <path d="M-36 12 H36 L30 20 H-30 Z" fill="#fff4d6" stroke="#6b4a12" strokeWidth="1.6" strokeLinejoin="round" />
      {label(32, 'PROJECTS', 8.5, '#4a3208', { letterSpacing: 1.8 })}
    </>
  ),
  uni: () => (
    <>
      <path d="M-43 48 V-8 A43 43 0 0 1 43 -8 V48 Z" fill="#7a2c3a" stroke="#d8b868" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M-37 42 V-8 A37 37 0 0 1 37 -8 V42 Z" fill="none" stroke="#d8b868" strokeWidth="1" strokeDasharray="3.2 2.6" opacity=".8" />
      <path d="M-18 -26 Q0 -34 18 -26 V-14 Q0 -22 -18 -14 Z" fill="none" {...thread('#e8d08a', 1.6)} />
      <path d="M0 -29 V-17" {...thread('#e8d08a', 1.2)} />
      <text y="10" textAnchor="middle" fontSize="19" fill="#e8d08a" fontFamily="Bitter, Georgia, serif" fontWeight="800" letterSpacing="1.5">NUST</text>
      <path d="M-24 18 H24" {...thread('#e8d08a', 1)} strokeDasharray="2 2" />
      {label(31, 'BS COMPUTER SCIENCE', 5.6, '#e8d08a', { letterSpacing: 0.8 })}
    </>
  ),
  craft: () => (
    <>
      <circle r="54" fill="#c79a62" stroke="#8d6a3b" strokeWidth="2.4" />
      <circle r="47" fill="#efe3c8" stroke="#8d6a3b" strokeWidth="1.6" />
      <rect x="-6" y="-66" width="12" height="14" rx="2" fill="#a07842" stroke="#6e5028" strokeWidth="1.4" />
      <circle cy="-60" r="2.4" fill="#6e5028" />
      <g {...thread('#3b3a38', 2)}>
        <path d="M-6 -4 L-24 -26" /><path d="M6 -4 L24 -26" /><path d="M-6 -4 L12 12" /><path d="M6 -4 L-12 12" />
      </g>
      <circle cx="-17" cy="18" r="6" fill="none" {...thread('#b4574a', 2)} />
      <circle cx="17" cy="18" r="6" fill="none" {...thread('#b4574a', 2)} />
      <g {...thread('#c4452c', 1.8)} strokeDasharray="4 2">
        <path d="M-34 -2 q-4 -14 8 -16" /><path d="M34 -2 q4 -14 -8 -16" />
      </g>
      <g fill="#e9a58f" stroke="#a9553f" strokeWidth="1">
        {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-34" rx="4" ry="7" transform={`rotate(${r} 0 -26)`} />)}
      </g>
      <circle cy="-26" r="3" fill="#f3d27a" />
      {label(40, 'made by hand', 12, '#7a4a2a', { fontFamily: 'Reenie Beanie, cursive', textLength: 66, lengthAdjust: 'spacingAndGlyphs' })}
    </>
  ),
  contact: () => (
    <>
      <path d="M-52 -44 H52 V28 L0 46 L-52 28 Z" fill="#334d6c" stroke="#e2b768" strokeWidth="3" strokeLinejoin="round" />
      <path d="M-46 -38 H46 V24 L0 40 L-46 24 Z" fill="none" stroke="#e2b768" strokeWidth="1" strokeDasharray="3 2.4" opacity=".8" />
      <rect x="-52" y="-44" width="104" height="17" fill="#2a4260" stroke="#e2b768" strokeWidth="2" />
      <circle cy="-35" r="5" fill="#d8b868" stroke="#8d6a3b" strokeWidth="1.2" />
      <rect x="-22" y="-16" width="44" height="28" rx="2" fill="none" {...thread(CREAM, 1.8)} />
      <path d="M-22 -16 L0 0 L22 -16" {...thread(CREAM, 1.8)} />
      <text y="30" textAnchor="middle" fontSize="15" fill={CREAM} fontFamily="Reenie Beanie, cursive" textLength="56" lengthAdjust="spacingAndGlyphs">say hello</text>
    </>
  ),
  code: () => (
    <>
      <circle r="28" fill="#2f5d4a" stroke={CREAM} strokeWidth="3.2" />
      <circle r="22.5" fill="none" stroke={CREAM} strokeWidth="1" strokeDasharray="3 2.4" opacity=".75" />
      <text y="5.5" textAnchor="middle" fontSize="16" fontWeight="700" fill={CREAM} fontFamily="monospace">&lt;/&gt;</text>
    </>
  ),
  book: ({ w, h }) => (
    <>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="3" fill="#7b4a3a" stroke="#e9dcc0" strokeWidth="3" />
      <rect x={-w / 2 + 6} y={-h / 2 + 3} width="2.4" height={h - 6} fill="#4a2a20" />
      <rect x={w / 2 - 7} y={-h / 2 + 4} width="4" height={h - 8} fill="#f1e6cb" opacity=".85" />
      <path d="M-12 -14 H14 M-12 -7 H8" {...thread(CREAM, 1.8)} />
      <path d={`M10 ${h / 2 - 2} v10 l4 -4 l4 4 v-10`} fill="#c4452c" stroke="none" transform="translate(-6 -10)" />
    </>
  ),
  pact: ({ w, h }) => (
    <>
      <Felt w={w} h={h} fill="#dc9ca5" rx={14} />
      <path d="M-22 -16 H22 Q28 -16 28 -10 V6 Q28 12 22 12 H4 L-8 22 L-8 12 H-22 Q-28 12 -28 6 V-10 Q-28 -16 -22 -16 Z" fill="#f6e3dc" {...{ stroke: '#8d4a56', strokeWidth: 1.6, strokeLinejoin: 'round' }} />
      {[-12, 0, 12].map((x) => <circle key={x} cx={x} cy="-2" r="2.6" fill="#8d4a56" />)}
      {label(h / 2 - 7, 'PACT AI', 7.5, '#5c2a34', { letterSpacing: 1.4 })}
    </>
  ),
  rmd: ({ w, h }) => (
    <>
      <Felt w={w} h={h} fill="#8fae8c" />
      {[[-20, 42], [-8, 32], [4, 22]].map(([y, bw], i) => (
        <g key={y}>
          <text x="-30" y={y + 8} fontSize="9" fill="#223a22" fontWeight="700" fontFamily="Bitter, serif">{i + 1}</text>
          <rect x="-22" y={y} width={bw} height="9" rx="2" fill={CREAM} />
        </g>
      ))}
      {label(h / 2 - 8, 'RATE MY DOST', 6.4, '#223a22', { letterSpacing: 1 })}
    </>
  ),
  agritech: () => (
    <>
      <circle r="36" fill="#4f7a52" stroke={CREAM} strokeWidth="3.2" />
      <circle r="30.5" fill="none" stroke={CREAM} strokeWidth="1" strokeDasharray="3 2.4" opacity=".7" />
      <path d="M0 -22 C20 -12 22 12 0 24 C-22 12 -20 -12 0 -22 Z" fill="#b6cf9e" stroke="#243b25" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M0 -20 V22 M0 -6 l9 -6 M0 -6 l-9 -6 M0 6 l10 -6 M0 6 l-10 -6" {...thread('#243b25', 1.1)} />
    </>
  ),
  moodwave: () => (
    <>
      <ellipse rx="42" ry="31" fill="#4b5d73" stroke={CREAM} strokeWidth="3.2" />
      <ellipse rx="36.5" ry="25.5" fill="none" stroke={CREAM} strokeWidth="1" strokeDasharray="3 2.4" opacity=".7" />
      {Array.from({ length: 13 }, (_, i) => {
        const hh = 5 + Math.abs(Math.sin(i * 0.9) * 15 + Math.sin(i * 0.4) * 6);
        return <path key={i} d={`M${-24 + i * 4} ${-hh / 2 - 2} v${hh}`} {...thread(i === 6 ? '#e9a58f' : CREAM, 2.2)} />;
      })}
      {label(21, 'MOODWAVE', 6.4, CREAM, { letterSpacing: 1.2 })}
    </>
  ),
  satiate: ({ w, h }) => (
    <>
      <Felt w={w} h={h} fill="#d8c196" edge="#fbf1d8" ring="#6b5530" />
      <path d="M0 14 C-22 -2 -14 -22 0 -10 C14 -22 22 -2 0 14 Z" fill="#b24a4a" stroke="#6e2a2a" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M-8 -6 q4 -5 9 -2" {...thread('#f0b4b0', 1.2)} />
      {label(h / 2 - 8, 'SATIATE', 7.5, '#4a3a22', { letterSpacing: 1.6 })}
    </>
  ),
};

// Work badges: a clip, a card, the company name.
export function Badge({ w, h, name, role, band }) {
  return (
    <>
      <path d={`M0 ${-h / 2 - 10} V${-h / 2 + 2}`} stroke="#d9d4c8" strokeWidth="2.4" />
      <rect x="-9" y={-h / 2 - 4} width="18" height="9" rx="2.5" fill="#b9b4a8" stroke="#8a857a" strokeWidth="1" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="7" fill="#f7f1e2" stroke="#b9b1a0" strokeWidth="1.6" />
      <path d={`M${-w / 2} ${-h / 2 + 7} Q${-w / 2} ${-h / 2} ${-w / 2 + 7} ${-h / 2} H${w / 2 - 7} Q${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 7} V${-h / 2 + 24} H${-w / 2} Z`} fill={band} />
      <circle cy={-h / 2 + 12} r="2.4" fill="#f7f1e2" />
      <circle cy="-6" r="11" fill="#d8cfbd" />
      <path d="M-9 14 Q0 -2 9 14 Z" fill="#c4b9a3" transform="translate(0 -6)" />
      <text y="22" textAnchor="middle" fontSize={name.length > 8 ? 8.6 : 10} fontWeight="800" fill="#2b2926" fontFamily="Bitter, Georgia, serif">{name}</text>
      {role
        ? <text y="32" textAnchor="middle" fontSize="5.8" fill="#6d675d" className="stitch-text">{role}</text>
        : <path d="M-18 30 H18" stroke="#cfc7b6" strokeWidth="2" strokeLinecap="round" />}
    </>
  );
}

// Tiny decorations that get sewn on as the visitor opens things.
export const bonus = [
  <path key="star" d="M0 -11 L3.2 -3.4 L11 -3.4 L4.8 1.6 L7 9.6 L0 5 L-7 9.6 L-4.8 1.6 L-11 -3.4 L-3.2 -3.4 Z" fill="#e0a53c" stroke="#8a5f12" strokeWidth="1.4" strokeLinejoin="round" />,
  <path key="heart" d="M0 10 C-14 0 -10 -12 0 -5 C10 -12 14 0 0 10 Z" fill="#c4452c" stroke="#7a2616" strokeWidth="1.4" strokeLinejoin="round" />,
  <g key="flower">{[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cy="-6" rx="4.4" ry="6.4" transform={`rotate(${r})`} fill="#f0c4b4" stroke="#a9553f" strokeWidth="1" />)}<circle r="3.4" fill="#f3d27a" stroke="#a9853a" strokeWidth="1" /></g>,
  <g key="moon"><circle r="12" fill="#27364f" stroke="#efe3c6" strokeWidth="2" /><path d="M3 -8 A9 9 0 1 0 3 8 A7 7 0 0 1 3 -8 Z" fill="#efe3c6" /></g>,
  <path key="pennant" d="M-12 -8 H12 L0 12 Z" fill="#7f9a7a" stroke="#41583f" strokeWidth="1.4" strokeLinejoin="round" />,
  <g key="cross"><rect x="-11" y="-11" width="22" height="22" rx="2" fill="#efe3c6" stroke="#b4a37c" strokeWidth="1.4" />{[[-5, -5], [5, -5], [0, 0], [-5, 5], [5, 5]].map(([x, y]) => <path key={`${x}${y}`} d={`M${x - 2.4} ${y - 2.4} l4.8 4.8 M${x + 2.4} ${y - 2.4} l-4.8 4.8`} {...thread('#c4452c', 1.4)} />)}</g>,
  <path key="leaf" d="M0 -11 C12 -5 12 7 0 11 C-12 7 -12 -5 0 -11 Z M0 -9 V10" fill="#8fb27c" stroke="#3d5a31" strokeWidth="1.4" strokeLinejoin="round" />,
  <path key="spiral" d="M0 0 m0 0 a2 2 0 1 1 3 2 a5 5 0 1 1 -7 -3 a8 8 0 1 1 10 8" {...thread('#334d6c', 2.2)} />,
];
