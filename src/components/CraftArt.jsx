// Drawn stand-ins for craft photos. They give way to a real <img> as soon as
// a craft in portfolio.js gets a `photo` path.
const base = import.meta.env.BASE_URL;

const art = {
  flower: (
    <g>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="100" cy="68" rx="17" ry="30" fill="#e9a58f" stroke="#a9553f" strokeWidth="1.5" transform={`rotate(${r} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="13" fill="#f3d27a" stroke="#a9853a" strokeWidth="1.5" />
      <path d="M100 130 C98 160 104 175 100 195" stroke="#5f7d5a" strokeWidth="3" fill="none" />
      <path d="M100 165 C120 150 132 154 138 148 C128 166 114 170 100 165Z" fill="#8cab83" stroke="#5f7d5a" strokeWidth="1.5" />
    </g>
  ),
  crane: (
    <g strokeLinejoin="round" strokeWidth="1.5" stroke="#3b4a63">
      <path d="M40 112 L100 96 L100 150Z" fill="#cfd8e6" />
      <path d="M100 96 L168 70 L120 118 L100 150Z" fill="#aebbd1" />
      <path d="M168 70 L186 52 L174 76Z" fill="#e8c4a6" />
      <path d="M100 96 L60 56 L120 118Z" fill="#dfe6f0" />
      <path d="M40 112 L24 134 L52 120Z" fill="#aebbd1" />
    </g>
  ),
  sketch: (
    <g fill="none" stroke="#4a4540" strokeLinecap="round">
      <path d="M40 60 C70 40 120 44 150 70 C170 90 160 130 120 150 C80 166 44 140 40 100 Z" strokeWidth="2" />
      <path d="M58 70 C82 58 118 60 138 78" strokeWidth="1" opacity=".6" />
      <path d="M52 92 C72 84 112 86 146 104" strokeWidth="1" opacity=".5" />
      <path d="M60 116 C86 108 110 112 132 128" strokeWidth="1" opacity=".4" />
      <path d="M150 150 L176 176" strokeWidth="5" stroke="#c98a4b" />
    </g>
  ),
  thread: (
    <g>
      <rect x="62" y="60" width="76" height="92" rx="8" fill="#b4574a" stroke="#6e2d26" strokeWidth="1.5" />
      {[78, 92, 106, 120, 134].map((y) => (
        <path key={y} d={`M62 ${y} Q100 ${y + 8} 138 ${y}`} stroke="#8c3d33" strokeWidth="2" fill="none" />
      ))}
      <rect x="54" y="52" width="92" height="12" rx="4" fill="#d9c9a8" stroke="#8a7a5a" strokeWidth="1.5" />
      <rect x="54" y="148" width="92" height="12" rx="4" fill="#d9c9a8" stroke="#8a7a5a" strokeWidth="1.5" />
      <path d="M138 100 C170 108 160 150 178 168" stroke="#b4574a" strokeWidth="2.5" fill="none" />
    </g>
  ),
  paper: (
    <g strokeLinejoin="round" strokeWidth="1.5" stroke="#6b6a3a">
      <path d="M100 150 L50 110 L100 40 L150 110Z" fill="#c9d3a0" />
      <path d="M100 150 L100 40 L150 110Z" fill="#a7b57c" />
      <path d="M50 110 L100 90 L150 110" fill="none" />
      <path d="M100 40 L100 90" />
    </g>
  ),
  decor: (
    <g>
      <path d="M20 54 Q100 112 180 54" stroke="#7d6a4c" strokeWidth="2" fill="none" />
      {[
        [42, 72, '#e9a58f'],
        [72, 88, '#f3d27a'],
        [104, 92, '#9bbd93'],
        [136, 86, '#b9a5d3'],
        [162, 70, '#e9a58f'],
      ].map(([x, y, c]) => (
        <path key={x} d={`M${x} ${y} l-12 30 l24 0Z`} fill={c} stroke="#5b4c36" strokeWidth="1.2" />
      ))}
      <circle cx="100" cy="150" r="18" fill="#f3d27a" stroke="#a9853a" strokeWidth="1.5" />
      <path d="M100 168 L100 186" stroke="#7d6a4c" strokeWidth="2" />
    </g>
  ),
};

export default function CraftArt({ craft, className = '', photoSoon = true }) {
  if (craft.photo) {
    return <img className={className} src={`${base}${craft.photo}`} alt={craft.title} loading="lazy" />;
  }
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={`${craft.title} (photo coming soon)`} preserveAspectRatio="xMidYMid meet">
      {art[craft.kind] || art.paper}
      {photoSoon && (
        <text x="100" y="192" textAnchor="middle" fontSize="10" fill="currentColor" opacity=".55" fontFamily="inherit">
          photo soon
        </text>
      )}
    </svg>
  );
}
