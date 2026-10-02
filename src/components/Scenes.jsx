import CraftArt from './CraftArt';

const base = import.meta.env.BASE_URL;
const INK = '#1f1a14';

function wave(y, amp, seed, from = 30, to = 270) {
  let d = '';
  for (let x = from; x <= to; x += 5) {
    const t = x / 9;
    const v = amp * (Math.sin(t * 0.9 + seed) * 0.55 + Math.sin(t * 2.3 + seed * 2) * 0.3 + Math.sin(t * 5.1) * 0.15);
    d += `${d ? 'L' : 'M'}${x} ${(y + v).toFixed(1)} `;
  }
  return d;
}

const Desk = ({ y = 232, fill = '#6b4a2f' }) => (
  <>
    <rect x="0" y={y} width="300" height={300 - y} fill={fill} />
    <rect x="0" y={y} width="300" height="5" fill="rgba(255,255,255,.12)" />
  </>
);

const Laptop = ({ x = 70, y = 96, w = 160, h = 104, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill="#1c2027" stroke="#394050" strokeWidth="3" />
    <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} fill="#0f1217" />
    {children}
    <path d={`M${x - 16} ${y + h + 3} H${x + w + 16} L${x + w + 8} ${y + h + 12} H${x - 8} Z`} fill="#b9bec6" />
  </g>
);

const scenes = {
  panda: (
    <>
      <rect width="300" height="300" fill="#1b2230" />
      <radialGradient id="gp" cx="50%" cy="45%" r="55%"><stop offset="0" stopColor="#2f4a5c" /><stop offset="1" stopColor="#10151d" /></radialGradient>
      <rect width="300" height="300" fill="url(#gp)" />
      <Desk fill="#3a2a1c" />
      <Laptop>
        <g fill="none" stroke="#86d1a4" strokeWidth="1.8" strokeLinejoin="round" transform="translate(-4 4) scale(.94 .82)">
          <path d={wave(122, 10, 1, 84, 236)} />
          <path d={wave(150, 14, 3, 84, 236)} stroke="#e9dcc0" />
          <path d={wave(178, 9, 5, 84, 236)} stroke="#e9a58f" />
        </g>
        <rect x="140" y="104" width="44" height="86" fill="none" stroke="#e9a58f" strokeWidth="1.2" strokeDasharray="4 3" />
      </Laptop>
    </>
  ),
  pact: (
    <>
      <rect width="300" height="300" fill="#e3c9b8" />
      <Desk y="210" fill="#b98e68" />
      <g transform="rotate(-6 150 150)">
        <rect x="98" y="40" width="104" height="200" rx="16" fill="#26282d" />
        <rect x="105" y="54" width="90" height="172" rx="6" fill="#f6efe0" />
        <rect x="112" y="64" width="50" height="22" rx="8" fill="#e6dccb" />
        <rect x="136" y="96" width="52" height="26" rx="8" fill="#c4623f" />
        <rect x="112" y="132" width="58" height="22" rx="8" fill="#e6dccb" />
        {[116, 132, 148, 164, 180].map((x, i) => <circle key={x} cx={x} cy="196" r="6" fill={i < 3 ? '#6f8c68' : 'none'} stroke={INK} strokeWidth="1.2" />)}
      </g>
    </>
  ),
  rmd: (
    <>
      <rect width="300" height="300" fill="#c7d6c0" />
      <Desk fill="#8a6b4a" />
      <Laptop>
        {[[112, 120, '#c4623f', 1], [138, 96, '#e0b04f', 2], [164, 70, '#6f8c68', 3]].map(([y, w, c, n]) => (
          <g key={n}><text x="86" y={y + 11} fill="#f6efe0" fontSize="12" fontFamily="DM Serif Display, serif">{n}</text><rect x="102" y={y} width={w} height="16" rx="3" fill={c} /></g>
        ))}
      </Laptop>
    </>
  ),
  agritech: (
    <>
      <rect width="300" height="300" fill="#a8c1d6" />
      <rect y="190" width="300" height="110" fill="#6b4a2f" />
      <path d="M0 190 Q75 176 150 190 T300 188 V200 H0Z" fill="#4f7a52" />
      <path d="M150 60 C226 88 232 170 150 232 C70 170 74 88 150 60Z" fill="#7fa56b" stroke="#2f4a2a" strokeWidth="3" />
      <path d="M150 70 V224 M150 104 l32 -20 M150 104 l-32 -20 M150 140 l38 -22 M150 140 l-38 -22 M150 176 l34 -18 M150 176 l-34 -18" stroke="#2f4a2a" strokeWidth="2" fill="none" />
      <path d="M86 98 v-18 h18 M214 98 v-18 h-18 M86 214 v18 h18 M214 214 v18 h-18" stroke="#fff" strokeWidth="3" fill="none" />
    </>
  ),
  moodwave: (
    <>
      <rect width="300" height="300" fill="#2a3446" />
      <path d="M62 190 C62 90 238 90 238 190" fill="none" stroke="#d9d0b8" strokeWidth="14" strokeLinecap="round" />
      <rect x="48" y="176" width="34" height="62" rx="14" fill="#c4623f" />
      <rect x="218" y="176" width="34" height="62" rx="14" fill="#c4623f" />
      {Array.from({ length: 21 }, (_, i) => {
        const h = 14 + Math.abs(Math.sin(i * 0.8) * 46 + Math.sin(i * 0.31) * 22);
        return <path key={i} d={`M${86 + i * 6.8} ${210 - h / 2} v${h}`} stroke={i % 5 === 2 ? '#e9a58f' : '#e9dcc0'} strokeWidth="4" strokeLinecap="round" />;
      })}
    </>
  ),
  satiate: (
    <>
      <rect width="300" height="300" fill="#d8c8a8" />
      <Desk fill="#8a6b4a" />
      <Laptop>
        <rect x="84" y="108" width="132" height="12" rx="2" fill="#6f8c68" />
        <rect x="84" y="126" width="62" height="56" rx="2" fill="#e0b04f" />
        <rect x="154" y="126" width="62" height="56" rx="2" fill="#e8b9a8" />
        <path d="M200 140 c-8 -8 -18 0 -10 10 l10 10 l10 -10 c8 -10 -2 -18 -10 -10z" fill="#b24a4a" transform="translate(-26 4) scale(.8)" />
      </Laptop>
    </>
  ),
  quest: (
    <>
      <rect width="300" height="300" fill="#202733" />
      <Desk fill="#33281d" />
      <Laptop>
        {[[88, 112], [150, 112], [88, 160], [150, 160], [200, 136]].map(([x, y], i) => <rect key={i} x={x} y={y} width="36" height="22" rx="5" fill={['#c4623f', '#e0b04f', '#6f8c68', '#5d729b', '#b4574a'][i]} />)}
        <path d="M124 123 H150 M124 171 H150 M186 123 L200 142 M186 171 L200 150" stroke="#e9dcc0" strokeWidth="2" fill="none" />
      </Laptop>
    </>
  ),
  zoomiez: (
    <>
      <rect width="300" height="300" fill="#d9cdb4" />
      <Desk y="220" fill="#7b5a3b" />
      <path d="M40 90 L148 78 L148 218 L40 226Z" fill="#fffdf6" stroke="#8a7a5a" strokeWidth="2" />
      <path d="M260 90 L152 78 L152 218 L260 226Z" fill="#f4ecd8" stroke="#8a7a5a" strokeWidth="2" />
      {[[56, 104, 70], [56, 120, 56], [56, 136, 66], [170, 98, 64], [170, 114, 72]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height="6" rx="2" fill="#6d675d" opacity=".6" />)}
      <rect x="52" y="98" width="82" height="22" fill="none" stroke="#c4623f" strokeWidth="2" />
      <rect x="166" y="108" width="90" height="22" fill="none" stroke="#5d729b" strokeWidth="2" />
    </>
  ),
  nust: (
    <>
      <rect width="300" height="300" fill="url(#sk)" />
      <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9cc0dd" /><stop offset="1" stopColor="#f3d9a8" /></linearGradient>
      <path d="M0 250 H300 V300 H0Z" fill="#6f8c68" />
      <path d="M40 250 V120 H260 V250Z" fill="#c9a98a" />
      <path d="M40 120 H260" stroke="#8a6a4a" strokeWidth="4" />
      <path d="M124 250 V170 A26 26 0 0 1 176 170 V250Z" fill="#4a3a2a" />
      {[62, 92, 208, 238].map((x) => <rect key={x} x={x - 10} y="150" width="20" height="34" fill="#5d729b" stroke="#f6efe0" strokeWidth="3" />)}
      <path d="M130 120 V90 L150 70 L170 90 V120Z" fill="#b69677" />
      <circle cx="26" cy="226" r="26" fill="#547a4c" /><circle cx="278" cy="232" r="22" fill="#4f7a52" />
    </>
  ),
  contact: (
    <>
      <rect width="300" height="300" fill="#b98e68" />
      {[0, 60, 120, 180, 240].map((y) => <path key={y} d={`M0 ${y} H300`} stroke="rgba(60,35,15,.25)" strokeWidth="2" />)}
      <g transform="rotate(-8 150 150)">
        <rect x="60" y="100" width="180" height="116" fill="#f6efe0" stroke="#8a7a5a" strokeWidth="2" />
        <path d="M60 100 L150 170 L240 100" fill="#e8d9b8" stroke="#8a7a5a" strokeWidth="2" />
        <circle cx="150" cy="168" r="12" fill="#c4452c" />
      </g>
      <path d="M200 240 L262 196" stroke="#334d6c" strokeWidth="8" strokeLinecap="round" />
    </>
  ),
};

export default function Scene({ id }) {
  if (id === 'about') {
    return <img className="scene-photo" src={`${base}hira.jpg`} alt="Hira Sajid" loading="lazy" />;
  }
  if (id === 'crafts') {
    return (
      <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="300" fill="#6f8c68" />
        <path d="M0 0 H300 M0 60 H300 M0 120 H300 M0 180 H300 M0 240 H300 M60 0 V300 M120 0 V300 M180 0 V300 M240 0 V300" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
        <svg x="20" y="0" width="160" height="160"><CraftArt craft={{ kind: 'crane' }} photoSoon={false} /></svg>
        <svg x="160" y="130" width="130" height="130"><CraftArt craft={{ kind: 'thread' }} photoSoon={false} /></svg>
        <svg x="10" y="150" width="120" height="120"><CraftArt craft={{ kind: 'flower' }} photoSoon={false} /></svg>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {scenes[id]}
    </svg>
  );
}
