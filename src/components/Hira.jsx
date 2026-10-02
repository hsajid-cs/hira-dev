// The little character, and the small drawings for everything you can give her.
const INK = '#2b2926';
const SKIN = '#d6a07a';
const HAIR = '#2b1d14';

export const art = {
  code: (
    <g>
      <circle r="24" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="-17" y="-12" width="34" height="24" rx="5" fill="#2f5d4a" stroke={INK} strokeWidth="1.6" />
      <text y="5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#efe3c6" fontFamily="monospace">&lt;/&gt;</text>
    </g>
  ),
  neural: (
    <g>
      <circle r="24" fill="#fff" stroke={INK} strokeWidth="2" />
      {[[-14, -9], [-14, 0], [-14, 9], [0, -13], [0, -4], [0, 5], [0, 14], [14, -6], [14, 6]].map(([x, y], i, a) => (
        a.filter(([x2]) => x2 === x + 14).map(([x2, y2]) => <path key={`${i}${y2}`} d={`M${x} ${y} L${x2} ${y2}`} stroke="#9aa0a8" strokeWidth=".8" />)
      ))}
      {[[-14, -9], [-14, 0], [-14, 9], [0, -13], [0, -4], [0, 5], [0, 14], [14, -6], [14, 6]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={x === 0 ? '#e3b457' : x < 0 ? '#d9573a' : '#3f8a86'} stroke={INK} strokeWidth="1" />
      ))}
    </g>
  ),
  phone: (
    <g>
      <circle r="24" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="-9" y="-16" width="18" height="32" rx="4" fill="#dc9ca5" stroke={INK} strokeWidth="1.6" />
      <rect x="-6" y="-11" width="12" height="18" rx="1.5" fill="#f6e3dc" />
      <circle cy="11" r="2" fill={INK} />
    </g>
  ),
  brush: (
    <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <rect x="-12" y="0" width="24" height="26" rx="3" fill="#d9c9a8" />
      {[[-6, '#d9573a', -10], [0, '#3f8a86', 0], [6, '#e3b457', 10]].map(([x, c, r]) => (
        <g key={x} transform={`rotate(${r} ${x} 2)`}>
          <path d={`M${x} 2 V-26`} strokeWidth="3" stroke="#8a6a3a" />
          <path d={`M${x - 3} -26 Q${x} -38 ${x + 3} -26 Z`} fill={c} />
        </g>
      ))}
    </g>
  ),
  scissors: (
    <g stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="none" transform="rotate(-18)">
      <path d="M-4 -2 L-16 -28 M4 -2 L16 -28" strokeWidth="2.4" />
      <path d="M-4 -2 L8 14 M4 -2 L-8 14" />
      <circle cx="-11" cy="20" r="7" stroke="#d9573a" strokeWidth="3" /><circle cx="11" cy="20" r="7" stroke="#d9573a" strokeWidth="3" />
    </g>
  ),
  thread: (
    <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <rect x="-14" y="-16" width="28" height="32" rx="3" fill="#b4574a" />
      {[-9, -3, 3, 9].map((y) => <path key={y} d={`M-14 ${y} Q0 ${y + 4} 14 ${y}`} stroke="#7a3a30" fill="none" />)}
      <rect x="-18" y="-21" width="36" height="6" rx="2" fill="#d9c9a8" />
      <rect x="-18" y="15" width="36" height="6" rx="2" fill="#d9c9a8" />
      <path d="M14 -4 C30 0 26 20 38 28" fill="none" stroke="#b4574a" strokeWidth="2" />
      <path d="M34 22 L44 36" stroke="#9aa0a8" strokeWidth="2" />
    </g>
  ),
  paper: (
    <g strokeLinejoin="round" strokeWidth="1.6" stroke="#3b4a63">
      <path d="M-30 4 L0 -6 L0 26Z" fill="#cfd8e6" />
      <path d="M0 -6 L32 -26 L10 12 L0 26Z" fill="#aebbd1" />
      <path d="M32 -26 L40 -36 L36 -22Z" fill="#e8c4a6" />
      <path d="M0 -6 L-20 -32 L10 12Z" fill="#dfe6f0" />
      <path d="M-30 4 L-40 18 L-24 12Z" fill="#aebbd1" />
    </g>
  ),
  stack: (
    <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
      <rect x="-36" y="6" width="68" height="14" rx="2" fill="#5d729b" />
      <rect x="-32" y="-8" width="62" height="14" rx="2" fill="#d9573a" transform="rotate(-2 0 0)" />
      <rect x="-28" y="-22" width="54" height="14" rx="2" fill="#e3b457" transform="rotate(2 0 -16)" />
      <path d="M-30 13 H28 M-26 -1 H26 M-22 -15 H22" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" />
    </g>
  ),
  notebook: (
    <g stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <rect x="-30" y="-14" width="50" height="34" rx="3" fill="#4a6b5c" transform="rotate(-4)" />
      <rect x="-24" y="-8" width="38" height="22" rx="1" fill="#efe3c6" transform="rotate(-4)" strokeWidth="1" />
      {[-24, -17, -10].map((y) => <circle key={y} cx="-30" cy={y + 12} r="1.6" fill={INK} transform="rotate(-4)" />)}
      <path d="M22 -10 L36 24" stroke="#d9573a" strokeWidth="4" />
      <path d="M36 24 L38 30" stroke={INK} strokeWidth="2" />
    </g>
  ),
};

const outfits = {
  tee: { top: '#c9b79a', extra: null },
  lanyard: { top: '#334d6c' },
  campus: { top: '#7a2c3a' },
  volunteer: { top: '#3f8a86' },
  apron: { top: '#efe3c6' },
};

function Outfit({ id }) {
  const { top } = outfits[id];
  return (
    <g stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M104 252 Q98 296 104 338 L128 338 Q126 296 130 256Z" fill={top} />
      <path d="M216 252 Q222 296 216 338 L192 338 Q194 296 190 256Z" fill={top} />
      <path d="M108 338 H130 L128 350 H110Z M190 338 H212 L210 350 H192Z" fill={SKIN} stroke={INK} />
      <path d="M108 340 L112 246 Q116 214 148 208 H172 Q204 214 208 246 L212 340 Z" fill={top} />
      {id === 'tee' && <path d="M148 208 Q160 226 172 208" fill="none" />}
      {id === 'lanyard' && (
        <>
          <path d="M146 208 L160 290 L174 208" fill="none" stroke="#d9573a" strokeWidth="3.4" />
          <rect x="146" y="286" width="28" height="36" rx="3" fill="#efe3c6" />
          <circle cx="160" cy="299" r="6" fill="#d9c9a8" strokeWidth="1.4" />
          <path d="M151 313 H169 M151 318 H163" strokeWidth="1.4" />
        </>
      )}
      {id === 'campus' && (
        <>
          <path d="M160 214 V338" strokeWidth="2.4" />
          <path d="M140 210 L160 232 L180 210" fill="#efe3c6" />
          <path d="M112 330 H208" stroke="#efe3c6" strokeWidth="6" />
          <circle cx="156" cy="270" r="1.6" fill={INK} /><circle cx="156" cy="290" r="1.6" fill={INK} />
        </>
      )}
      {id === 'volunteer' && (
        <>
          <path d="M146 208 Q160 222 174 208" fill="none" />
          <rect x="176" y="256" width="22" height="16" rx="2" fill="#efe3c6" strokeWidth="1.4" />
          <path d="M180 262 H194 M180 267 H190" strokeWidth="1.2" />
        </>
      )}
      {id === 'apron' && (
        <>
          <path d="M132 224 L140 338 H180 L188 224 Q160 238 132 224Z" fill="#d8c7a3" />
          <path d="M140 218 L134 210 M180 218 L186 210" strokeWidth="2" />
          <rect x="146" y="290" width="28" height="20" rx="2" fill="#c8b48a" strokeWidth="1.6" />
        </>
      )}
    </g>
  );
}

function HairBack({ id }) {
  const f = { fill: HAIR, stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round' };
  if (id === 'long') return <path d="M114 150 Q104 236 122 270 L198 270 Q216 236 206 150 Z" {...f} />;
  if (id === 'bob') return <path d="M114 150 Q106 202 120 218 L200 218 Q214 202 206 150 Z" {...f} />;
  return null;
}

function HairFront({ id }) {
  const f = { fill: HAIR, stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round' };
  return (
    <g>
      <path d="M116 150 Q112 98 160 96 Q208 98 204 150 Q196 120 160 114 Q124 120 116 150Z" {...f} />
      {(id === 'long' || id === 'bob') && (
        <>
          <path d="M116 150 Q108 190 118 216 L132 216 Q124 184 130 150Z" {...f} />
          <path d="M204 150 Q212 190 202 216 L188 216 Q196 184 190 150Z" {...f} />
        </>
      )}
      {id === 'bun' && (
        <>
          <circle cx="160" cy="88" r="21" {...f} />
          <path d="M142 100 Q160 108 178 100" fill="none" stroke="#d9573a" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {id === 'braid' && (
        <g {...f}>
          {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={198 + i * 2} cy={176 + i * 17} rx="9" ry="10" />)}
          <path d="M197 270 L201 290 L209 270" fill="#d9573a" />
        </g>
      )}
    </g>
  );
}

function Accessory({ id }) {
  if (id === 'headphones') {
    return (
      <g stroke={INK} strokeWidth="2.2" strokeLinecap="round">
        <path d="M112 152 Q110 88 160 88 Q210 88 208 152" fill="none" stroke="#d9573a" strokeWidth="8" />
        <path d="M112 152 Q110 88 160 88 Q210 88 208 152" fill="none" strokeWidth="2.2" opacity=".0" />
        <rect x="100" y="138" width="18" height="40" rx="8" fill="#d9573a" />
        <rect x="202" y="138" width="18" height="40" rx="8" fill="#d9573a" />
      </g>
    );
  }
  if (id === 'glasses') {
    return (
      <g fill="rgba(255,255,255,.18)" stroke={INK} strokeWidth="2.6">
        <circle cx="145" cy="152" r="14" /><circle cx="175" cy="152" r="14" />
        <path d="M159 152 H161 M131 150 L119 146 M189 150 L201 146" fill="none" />
      </g>
    );
  }
  if (id === 'pins') {
    return (
      <g stroke={INK} strokeWidth="1.6">
        <circle cx="128" cy="266" r="6" fill="#e3b457" /><circle cx="140" cy="276" r="5" fill="#d9573a" />
        <path d="M130 284 L134 292 L142 292 L136 297 L138 305 L130 300 L122 305 L124 297 L118 292 L126 292Z" fill="#3f8a86" />
      </g>
    );
  }
  return null;
}

export default function Hira({ pick }) {
  const { hair, outfit, accessory, sticker, craft, books } = pick;
  return (
    <svg className="hira" viewBox="0 0 320 420" role="img" aria-label="A little drawing of Hira at her desk">
      <rect width="320" height="420" rx="18" fill="#f1dfc2" />
      <rect x="0" y="120" width="320" height="2" fill="rgba(0,0,0,.06)" />
      <rect x="22" y="26" width="64" height="86" rx="4" fill="#fff" stroke={INK} strokeWidth="2" opacity=".9" />
      <path d="M30 94 L44 72 L56 86 L66 66 L80 94Z" fill="#8cab83" />
      <circle cx="66" cy="46" r="7" fill="#e3b457" />
      <HairBack id={hair} />
      <rect x="148" y="190" width="24" height="26" fill={SKIN} stroke={INK} strokeWidth="2.2" />
      <Outfit id={outfit} />
      <ellipse cx="160" cy="152" rx="44" ry="50" fill={SKIN} stroke={INK} strokeWidth="2.2" />
      <ellipse cx="116" cy="156" rx="6" ry="10" fill={SKIN} stroke={INK} strokeWidth="2" />
      <ellipse cx="204" cy="156" rx="6" ry="10" fill={SKIN} stroke={INK} strokeWidth="2" />
      <circle cx="145" cy="154" r="3.4" fill={INK} /><circle cx="175" cy="154" r="3.4" fill={INK} />
      <path d="M136 142 Q145 137 154 141 M166 141 Q175 137 184 142" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M160 156 Q156 168 162 170" fill="none" stroke="#a8704c" strokeWidth="2" strokeLinecap="round" />
      <path d="M146 178 Q160 190 174 178" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="132" cy="174" r="6" fill="#e58a7a" opacity=".35" /><circle cx="188" cy="174" r="6" fill="#e58a7a" opacity=".35" />
      <HairFront id={hair} />
      <Accessory id={accessory} />

      <rect x="0" y="338" width="320" height="82" fill="#b07f50" stroke={INK} strokeWidth="2.2" />
      <rect x="0" y="338" width="320" height="8" fill="rgba(255,255,255,.18)" />

      <g key={`books-${books}`} className="drop" transform="translate(62 322)">{books !== 'none' && art[books]}</g>
      <g transform="translate(244 300)">
        <rect x="-52" y="-46" width="104" height="78" rx="6" fill="#cfd3d9" stroke={INK} strokeWidth="2.2" />
        <rect x="-60" y="32" width="120" height="8" rx="3" fill="#aeb3ba" stroke={INK} strokeWidth="2" />
        <circle cx="0" cy="-34" r="3" fill="#aeb3ba" />
        <g key={`sticker-${sticker}`} className="drop" transform="translate(0 -6)">{sticker !== 'none' && art[sticker]}</g>
      </g>
      <g key={`craft-${craft}`} className="drop" transform="translate(150 376) scale(1.05)">{craft !== 'none' && art[craft]}</g>
    </svg>
  );
}
