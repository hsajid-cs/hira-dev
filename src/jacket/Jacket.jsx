import { bonus } from './patches';
import Mark from './Mark';
import { items, bonusSpots, trinkets } from './layout';

const STITCH = { stroke: '#e2b768', strokeWidth: 1.3, strokeDasharray: '4 3', fill: 'none', strokeLinecap: 'round' };
const mirror = 'translate(640 0) scale(-1 1)';

const sleeve = 'M202 96 C150 100 100 130 84 180 L44 626 L150 650 L188 300 L192 262 Z';
const collar = 'M320 64 L238 44 Q216 44 206 68 L190 118 L262 152 L320 110 Z';

function Denim() {
  return (
    <g>
      <g stroke="#1f3149" strokeWidth="2.2" strokeLinejoin="round">
        <path d={sleeve} fill="url(#denim)" />
        <path d={sleeve} fill="url(#denim)" transform={mirror} />
        <path d="M200 96 L190 730 Q320 748 450 730 L440 96 Z" fill="url(#denim)" />
        <path d="M44 626 L150 650 L146 702 L38 676 Z" fill="url(#denimDark)" />
        <path d="M44 626 L150 650 L146 702 L38 676 Z" fill="url(#denimDark)" transform={mirror} />
        <path d="M190 690 Q320 706 450 690 L450 730 Q320 748 190 730 Z" fill="url(#denimDark)" />
        <path d="M238 44 Q320 22 402 44 L320 66 Z" fill="#1f3149" />
        <path d={collar} fill="url(#denimDark)" />
        <path d={collar} fill="url(#denimDark)" transform={mirror} />
      </g>
      <path d="M200 96 L190 730 Q320 748 450 730 L440 96 Z" fill="url(#shade)" />
      <path d={sleeve} fill="url(#shade)" />
      <path d={sleeve} fill="url(#shade)" transform={mirror} />
      <rect x="307" y="110" width="26" height="626" fill="#000" opacity=".12" />
      <path d="M307 112 V734 M333 112 V734" {...STITCH} />
      <path d="M320 112 V736" stroke="#c9c9c9" strokeWidth="3.4" strokeDasharray="1.8 1.8" />
      <path d="M318 76 L240 56 Q224 56 216 74 L204 118 L262 142 L318 104" {...STITCH} />
      <path d="M318 76 L240 56 Q224 56 216 74 L204 118 L262 142 L318 104" {...STITCH} transform={mirror} />
      <path d="M180 306 L142 646" {...STITCH} />
      <path d="M180 306 L142 646" {...STITCH} transform={mirror} />
      <path d="M192 698 Q320 714 448 698" {...STITCH} />
      <path d="M46 640 L146 664" {...STITCH} />
      <path d="M46 640 L146 664" {...STITCH} transform={mirror} />
      <path d="M204 100 Q250 118 262 150" {...STITCH} />
      <path d="M204 100 Q250 118 262 150" {...STITCH} transform={mirror} />
      <rect x="315" y="106" width="10" height="20" rx="3" fill="#b9b9b9" stroke="#6a6a6a" strokeWidth="1.2" />
    </g>
  );
}

function Trinket({ t }) {
  switch (t.id) {
    case 'keychain':
      return (
        <g>
          <circle cx="320" cy="132" r="5" fill="none" stroke="#a9a9a9" strokeWidth="1.8" />
          <path d="M320 137 V160" stroke="#a9a9a9" strokeWidth="1.4" strokeDasharray="2.4 1.6" />
          <rect x="308" y="160" width="24" height="16" rx="3" fill="#e9d6a8" stroke="#8a6f35" strokeWidth="1.3" />
          <circle cx="313" cy="165" r="1.6" fill="#8a6f35" />
          <path d="M318 171 H328" stroke="#8a6f35" strokeWidth="1.1" />
        </g>
      );
    case 'tag':
      return (
        <g transform="rotate(-6 96 700)">
          <path d="M96 692 V706" stroke="#8a6f35" strokeWidth="1.2" />
          <path d="M84 706 H108 V726 H84 Z" fill="#e9d6a8" stroke="#8a6f35" strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="96" cy="710" r="1.8" fill="#8a6f35" />
          <path d="M88 718 H104 M88 722 H100" stroke="#8a6f35" strokeWidth="1" />
        </g>
      );
    case 'label':
      return (
        <g>
          <rect x="303" y="34" width="34" height="14" rx="2" fill="#efe3c6" stroke="#b4a37c" strokeWidth="1" />
          <text x="320" y="44" textAnchor="middle" fontSize="5" fill="#6d5a2e" className="stitch-text">HANDMADE</text>
        </g>
      );
    case 'notebook':
      return (
        <g>
          <path d="M214 696 V706" stroke="#c9a46a" strokeWidth="1.4" />
          <rect x="203" y="706" width="22" height="26" rx="2" fill="#6b8f7a" stroke="#2f4a3c" strokeWidth="1.3" />
          <path d="M207 710 v18" stroke="#2f4a3c" strokeWidth="1" strokeDasharray="1.5 2" />
          <path d="M211 714 H221 M211 718 H219" stroke="#efe3c6" strokeWidth="1" />
        </g>
      );
    default:
      return (
        <g>
          <path d="M226 96 C222 104 236 110 240 100" fill="none" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="226" cy="95" r="3" fill="none" stroke="#b9b9b9" strokeWidth="1.6" />
          <path d="M240 100 L246 90" stroke="#b9b9b9" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
  }
}

function Note({ t }) {
  const w = Math.max(...t.lines.map((l) => l.length)) * 5 + 18;
  const h = t.lines.length * 13 + 10;
  const above = t.y > 600;
  const y = above ? t.y - h - 24 : t.y + 34;
  const x = Math.min(Math.max(t.x - w / 2, 8), 632 - w);
  return (
    <g className="note" pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#fff6dc" stroke="#8a6f35" strokeWidth="1.2" />
      {t.lines.map((l, i) => (
        <text key={l} x={x + 9} y={y + 15 + i * 13} fontSize="9" fill="#3a2f18" className={i ? 'stitch-text' : 'hand'} fontWeight={i ? 500 : 700}>{l}</text>
      ))}
    </g>
  );
}

export default function Jacket({ svgRef, active, seen, note, onOpen, onNote, onBackground }) {
  const sewn = Math.min(seen.length, bonus.length);
  return (
    <svg ref={svgRef} className="jacket" viewBox="0 0 640 800" role="group" aria-label="Hira's jacket. Each patch opens part of her portfolio." onClick={onBackground}>
      <defs>
        <pattern id="twill" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <rect width="5" height="5" fill="#3f5d80" />
          <rect width="2" height="5" fill="#fff" opacity=".06" />
        </pattern>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 .1 0 0 0 0 .15 0 0 0 0 .25 0 0 0 .22 0" />
        </filter>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".2" />
        </linearGradient>
        <pattern id="denim" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#twill)" />
          <rect width="160" height="160" filter="url(#grain)" />
        </pattern>
        <pattern id="denimDark" width="160" height="160" patternUnits="userSpaceOnUse">
          <rect width="160" height="160" fill="url(#twill)" />
          <rect width="160" height="160" filter="url(#grain)" />
          <rect width="160" height="160" fill="#10203a" opacity=".38" />
        </pattern>
      </defs>

      <Denim />

      {bonusSpots.slice(0, sewn).map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} aria-hidden="true">
          <g className="sew">{bonus[i]}</g>
        </g>
      ))}

      {items.map((it) => (
        <g
          key={it.id}
          className={`patch ${active === it.id ? 'away' : ''}`}
          transform={`translate(${it.x} ${it.y}) rotate(${it.r})`}
          role="button"
          tabIndex={0}
          aria-label={`${it.label}: ${it.sub}`}
          onClick={(e) => { e.stopPropagation(); onOpen(it.id); }}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(it.id))}
        >
          <g className="lift">
            <rect className="hit" x={-it.w / 2 - 6} y={-it.h / 2 - 6} width={it.w + 12} height={it.h + 12} rx="10" />
            <rect className="ring" x={-it.w / 2 - 6} y={-it.h / 2 - 6} width={it.w + 12} height={it.h + 12} rx="10" />
            <Mark item={it} />
            <g className="tip" transform={`translate(0 ${-it.h / 2 - 14}) rotate(${-it.r})`}>
              <rect x={-Math.max(it.label.length * 6.4, it.sub.length * 4.6) / 2 - 8} y="-24" width={Math.max(it.label.length * 6.4, it.sub.length * 4.6) + 16} height="27" rx="3" fill="#f6efdc" stroke="#8d7b55" strokeWidth="1.1" />
              <text y="-11" textAnchor="middle" fontSize="11" fontWeight="800" fill="#2b2926" className="stitch-text">{it.label}</text>
              <text y="-1" textAnchor="middle" fontSize="7.5" fill="#6d675d" className="stitch-text">{it.sub}</text>
            </g>
          </g>
        </g>
      ))}

      {trinkets.map((t) => (
        <g
          key={t.id}
          className="trinket"
          role="button"
          tabIndex={0}
          aria-label={t.lines.join(' ')}
          onClick={(e) => { e.stopPropagation(); onNote(note === t.id ? null : t.id); }}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onNote(note === t.id ? null : t.id))}
        >
          <g className="sway"><Trinket t={t} /></g>
          <rect className="hit" x={t.x - 18} y={t.y - 18} width="36" height="48" fill="transparent" />
        </g>
      ))}

      <g aria-hidden="true">
        <path d="M556 700 V714" stroke="#c9a46a" strokeWidth="1.2" />
        <path d="M556 712 L559 719 L567 719 L561 724 L563 732 L556 727 L549 732 L551 724 L545 719 L553 719 Z" fill="#e0a53c" stroke="#8a5f12" strokeWidth="1" strokeLinejoin="round" />
        <path d="M430 728 C446 746 424 758 440 768 C452 774 466 766 470 756" fill="none" stroke="#c4452c" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {trinkets.filter((t) => t.id === note).map((t) => <Note key={t.id} t={t} />)}
    </svg>
  );
}
