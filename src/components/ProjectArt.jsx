// One small drawing per project, shown on the pin and again, larger, in the detail view.
const INK = '#2d2823';
const RUST = '#c4623f';
const SAGE = '#6f8c68';

function trace(y, amp, seed, from = 20, to = 280) {
  let d = '';
  for (let x = from; x <= to; x += 5) {
    const t = x / 9;
    const v = amp * (Math.sin(t * 0.9 + seed) * 0.55 + Math.sin(t * 2.3 + seed * 2) * 0.3 + Math.sin(t * 5.1) * 0.15);
    d += `${d ? 'L' : 'M'}${x} ${(y + v).toFixed(1)} `;
  }
  return d;
}

const drawings = {
  panda: (
    <g fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={trace(95, 16, 1)} />
      <path d={trace(150, 22, 3)} />
      <path d={trace(205, 14, 5)} />
      <rect x="150" y="68" width="62" height="170" rx="6" stroke={RUST} strokeDasharray="5 5" strokeWidth="2" />
      <text x="156" y="62" fill={RUST} stroke="none" fontFamily="Caveat, cursive" fontSize="22">pain?</text>
      <path d="M20 250 H280" strokeWidth="1" opacity=".4" />
      {[20, 80, 140, 200, 260].map((x) => <path key={x} d={`M${x} 250 v6`} strokeWidth="1" opacity=".4" />)}
    </g>
  ),
  pact: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="95" y="38" width="110" height="224" rx="16" fill="#fbf6ec" stroke={INK} strokeWidth="2" />
      <rect x="104" y="60" width="92" height="182" rx="4" fill="none" stroke={INK} strokeWidth="1" opacity=".3" />
      <path d="M112 78 h50 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-50 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6z" fill="#e6dccb" stroke={INK} strokeWidth="1.2" />
      <path d="M138 120 h48 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 v-20 a6 6 0 0 1 6 -6z" fill={RUST} stroke={INK} strokeWidth="1.2" />
      <path d="M112 168 h56 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-56 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6z" fill="#e6dccb" stroke={INK} strokeWidth="1.2" />
      {[116, 134, 152, 170, 188].map((x, i) => (
        <circle key={x} cx={x} cy="222" r="6" fill={i < 3 ? SAGE : 'none'} stroke={INK} strokeWidth="1.2" />
      ))}
    </g>
  ),
  rmd: (
    <g strokeLinejoin="round" strokeLinecap="round" transform="rotate(-3 150 150)">
      {[
        [64, 220, RUST, '1'],
        [124, 170, '#e0b04f', '2'],
        [184, 120, SAGE, '3'],
      ].map(([y, w, c, n]) => (
        <g key={n}>
          <text x="30" y={y + 30} fontFamily="Fraunces, serif" fontSize="30" fill={INK}>{n}</text>
          <rect x="62" y={y} width={w} height="44" rx="6" fill={c} stroke={INK} strokeWidth="1.6" />
          <path d={`M${62 + w + 14} ${y + 28} l8 -14 l8 14`} fill="none" stroke={INK} strokeWidth="2" />
        </g>
      ))}
    </g>
  ),
  agritech: (
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d="M150 50 C230 80 240 180 150 255 C60 180 70 80 150 50Z" fill="#a7bd98" stroke={INK} strokeWidth="2" />
      <path d="M150 62 V248" stroke={INK} strokeWidth="1.5" />
      {[100, 135, 170, 205].map((y) => (
        <g key={y} stroke={INK} strokeWidth="1.1" opacity=".7">
          <path d={`M150 ${y} q30 -6 48 -22`} />
          <path d={`M150 ${y} q-30 -6 -48 -22`} />
        </g>
      ))}
      <path d="M88 96 v-14 h14 M212 96 v-14 h-14 M88 214 v14 h14 M212 214 v14 h-14" stroke={RUST} strokeWidth="2.5" />
      <circle cx="176" cy="150" r="9" fill="#6b4a2f" stroke="none" opacity=".75" />
    </g>
  ),
  moodwave: (
    <g strokeLinecap="round">
      {Array.from({ length: 22 }, (_, i) => {
        const h = 24 + Math.abs(Math.sin(i * 0.8) * 70 + Math.sin(i * 0.31) * 40);
        return <path key={i} d={`M${34 + i * 11.5} ${150 - h / 2} v${h}`} stroke={i % 5 === 2 ? RUST : INK} strokeWidth="5" />;
      })}
    </g>
  ),
  satiate: (
    <g strokeLinejoin="round">
      <rect x="40" y="52" width="220" height="196" rx="8" fill="#fbf6ec" stroke={INK} strokeWidth="2" />
      <path d="M40 78 H260" stroke={INK} strokeWidth="1.5" />
      {[56, 70, 84].map((x) => <circle key={x} cx={x} cy="65" r="3.5" fill={INK} opacity=".55" />)}
      <rect x="52" y="90" width="48" height="146" rx="3" fill="#e6dccb" stroke={INK} strokeWidth="1" />
      <rect x="110" y="90" width="138" height="38" rx="3" fill={SAGE} stroke={INK} strokeWidth="1.2" />
      <rect x="110" y="138" width="64" height="98" rx="3" fill="#e0b04f" stroke={INK} strokeWidth="1.2" />
      <rect x="184" y="138" width="64" height="98" rx="3" fill="#e8b9a8" stroke={INK} strokeWidth="1.2" />
    </g>
  ),
};

export default function ProjectArt({ id, className = "", fit = "slice" }) {
  return (
    <svg className={className} viewBox="0 0 300 300" preserveAspectRatio={`xMidYMid ${fit}`} aria-hidden="true">
      {drawings[id]}
    </svg>
  );
}
