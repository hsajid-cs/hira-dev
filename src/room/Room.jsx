import { spots, trinkets } from './layout';

const base = import.meta.env.BASE_URL;

// Deterministic "random" so the books on the shelf do not reshuffle on every render.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const bookColors = ['#b4574a', '#e3b457', '#5d729b', '#7f9a7a', '#d9a441', '#8a4a5a', '#3f5d52', '#e8d8b8', '#6b4a7a', '#c98a4b'];
const shelfRows = (() => {
  const r = rng(11);
  return [138, 214, 290, 366, 442].map((floor, row) => {
    const books = [];
    let x = 74;
    const limit = row === 1 ? 190 : row === 3 ? 214 : 246;
    while (x < limit) {
      const w = 9 + Math.floor(r() * 9);
      const h = 40 + Math.floor(r() * 24);
      books.push({ x, w, h, floor, c: bookColors[Math.floor(r() * bookColors.length)], lean: row === 2 && books.length === 6 });
      x += w + 1;
    }
    return books;
  });
})();

const THREAD = '#3a2a18';

function Shelf() {
  return (
    <g>
      <rect x="62" y="58" width="198" height="404" rx="3" fill="#8a5a3a" stroke={THREAD} strokeWidth="2" />
      <rect x="70" y="66" width="182" height="388" fill="#5e3b24" />
      {shelfRows.map((row, i) => (
        <g key={i}>
          {row.map((b, j) => (
            <g key={j} transform={b.lean ? `rotate(14 ${b.x + b.w} ${b.floor})` : undefined}>
              <rect x={b.x} y={b.floor - b.h} width={b.w} height={b.h} fill={b.c} stroke="rgba(0,0,0,.35)" strokeWidth="0.8" />
              <path d={`M${b.x + 2} ${b.floor - b.h + 8} h${b.w - 4} M${b.x + 2} ${b.floor - 9} h${b.w - 4}`} stroke="rgba(255,255,255,.4)" strokeWidth="0.8" />
            </g>
          ))}
          <rect x="70" y={row[0].floor} width="182" height="8" fill="#a8764a" stroke={THREAD} strokeWidth="1.2" />
        </g>
      ))}
      {/* a few things that are not books */}
      <g>
        <rect x="204" y="86" width="40" height="52" fill="#f6efe0" stroke={THREAD} strokeWidth="1.5" />
        <path d="M210 124 L222 106 L230 116 L236 108 L240 124 Z" fill="#8cab83" />
        <circle cx="236" cy="96" r="4" fill="#e3b457" />
      </g>
      <g>
        <rect x="196" y="300" width="22" height="30" rx="3" fill="#d9c9a8" stroke={THREAD} strokeWidth="1.3" />
        {[-6, 0, 6].map((d) => <path key={d} d={`M${207 + d} 300 l${d} -16`} stroke={['#c4452c', '#334d6c', '#e3b457'][d / 6 + 1]} strokeWidth="2.4" />)}
      </g>
      <g strokeLinejoin="round" stroke="#3b4a63" strokeWidth="1">
        <path d="M130 366 L148 350 L148 366Z" fill="#cfd8e6" /><path d="M148 350 L166 340 L156 366 L148 366Z" fill="#aebbd1" /><path d="M166 340 L172 336 L169 344Z" fill="#e8c4a6" />
      </g>
    </g>
  );
}

function Plant({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0 H26 L20 52 H-20 Z" fill="#b66a4a" stroke={THREAD} strokeWidth="2" strokeLinejoin="round" />
      <rect x="-28" y="-6" width="56" height="10" rx="2" fill="#c98062" stroke={THREAD} strokeWidth="2" />
      {[[-34, -50, -50], [-14, -78, -20], [10, -84, 8], [34, -58, 36], [-4, -50, 0], [24, -36, 62], [-30, -30, -64]].map(([dx, dy, rot], i) => (
        <path key={i} d="M0 0 C-12 -20 -8 -50 0 -64 C8 -50 12 -20 0 0 Z" transform={`translate(${dx * 0.45} -4) rotate(${rot}) scale(${0.85 + (i % 3) * 0.12})`} fill={i % 2 ? '#6c8f5f' : '#547a4c'} stroke="#2f4a2a" strokeWidth="1.4" />
      ))}
    </g>
  );
}

function Board() {
  return (
    <g>
      <rect x="552" y="58" width="222" height="146" rx="3" fill="#8a5a3a" stroke={THREAD} strokeWidth="2" />
      <rect x="560" y="66" width="206" height="130" fill="#c99d68" />
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={566 + ((i * 53) % 196)} cy={72 + ((i * 37) % 118)} r="1.3" fill="#a87c4a" opacity=".6" />)}
      <g transform="rotate(-3 612 114)">
        <rect x="578" y="76" width="68" height="84" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="1" />
        <image href={`${base}hira.jpg`} x="583" y="81" width="58" height="58" preserveAspectRatio="xMidYMid slice" />
        <circle cx="612" cy="78" r="3.2" fill="#c4452c" />
      </g>
      <g transform="rotate(4 690 112)">
        <rect x="660" y="80" width="56" height="68" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="1" />
        <rect x="665" y="85" width="46" height="46" fill="#9bbd93" />
        <path d="M665 120 L678 104 L690 116 L700 100 L711 118 V131 H665Z" fill="#547a4c" />
        <circle cx="700" cy="96" r="5" fill="#f3d27a" />
        <circle cx="688" cy="82" r="3.2" fill="#334d6c" />
      </g>
      <g transform="rotate(-5 744 150)">
        <rect x="722" y="128" width="44" height="46" fill="#f5d96a" stroke="#b89a2a" strokeWidth="1" />
        <text x="726" y="142" fontSize="6.4" fill="#4a3a10" className="hand" fontWeight="700">currently</text>
        <text x="726" y="151" fontSize="6.4" fill="#4a3a10" className="hand" fontWeight="700">learning</text>
        <text x="726" y="160" fontSize="6.4" fill="#4a3a10" className="hand" fontWeight="700">Git</text>
        <circle cx="744" cy="130" r="2.8" fill="#c4452c" />
      </g>
      <g transform="rotate(6 596 176)">
        <rect x="578" y="166" width="38" height="24" fill="#e8b9a8" stroke="#a9553f" strokeWidth="1" />
        <path d="M584 175 H610 M584 181 H600" stroke="#7a3a2a" strokeWidth="1" />
      </g>
    </g>
  );
}

function Calendar() {
  const month = new Date().toLocaleString('en', { month: 'short' }).toUpperCase();
  return (
    <g>
      <rect x="806" y="72" width="84" height="106" fill="#fffdf6" stroke={THREAD} strokeWidth="1.8" />
      <rect x="806" y="72" width="84" height="22" fill="#c4452c" stroke={THREAD} strokeWidth="1.8" />
      <text x="848" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" className="ui">{month}</text>
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={812 + (i % 7) * 11} y={100 + Math.floor(i / 7) * 14} width="8" height="9" fill={[4, 11, 17, 20].includes(i) ? '#e3b457' : '#e8e2d2'} />
      ))}
      <circle cx="848" cy="71" r="3" fill="#6d675d" />
    </g>
  );
}

function Window() {
  return (
    <g>
      <rect x="326" y="62" width="180" height="172" fill="#f6efe0" stroke={THREAD} strokeWidth="2" />
      <rect x="336" y="72" width="160" height="152" fill="url(#sky)" />
      <path d="M336 200 L370 170 L400 196 L440 160 L496 206 V224 H336Z" fill="#6f8c68" opacity=".7" />
      <path d="M416 72 V224 M336 148 H496" stroke="#f6efe0" strokeWidth="6" />
      <rect x="322" y="228" width="188" height="10" fill="#d9c9a8" stroke={THREAD} strokeWidth="1.6" />
      <path d="M322 54 H510" stroke="#5e3b24" strokeWidth="4" />
      <path d="M326 58 C346 120 340 180 322 232 L368 232 C358 170 364 110 354 58 Z" fill="#b4574a" stroke={THREAD} strokeWidth="1.6" />
      <path d="M506 58 C486 120 492 180 510 232 L464 232 C474 170 468 110 478 58 Z" fill="#b4574a" stroke={THREAD} strokeWidth="1.6" />
      <g transform="translate(400 228)">
        <rect x="-10" y="-14" width="20" height="14" rx="2" fill="#c98062" stroke={THREAD} strokeWidth="1.4" />
        {[-26, 0, 26].map((r) => <path key={r} d="M0 -14 C-5 -28 -3 -38 0 -44 C3 -38 5 -28 0 -14Z" transform={`rotate(${r} 0 -14)`} fill="#6c8f5f" stroke="#2f4a2a" strokeWidth="1" />)}
      </g>
    </g>
  );
}

function Desk() {
  return (
    <g>
      <rect x="316" y="378" width="16" height="84" fill="#8a5a3a" stroke={THREAD} strokeWidth="1.8" />
      <rect x="592" y="378" width="192" height="84" fill="#9a6a42" stroke={THREAD} strokeWidth="1.8" />
      <rect x="306" y="350" width="484" height="18" rx="2" fill="#b07f50" stroke={THREAD} strokeWidth="2" />
      <rect x="312" y="368" width="472" height="10" fill="#8a5a3a" stroke={THREAD} strokeWidth="1.4" />
    </g>
  );
}

function Drawers() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="598" y={382 + i * 26} width="178" height="24" rx="2" fill="#b07f50" stroke={THREAD} strokeWidth="1.6" />
          <rect x="600" y={384 + i * 26} width="174" height="20" rx="1" fill="none" stroke="rgba(255,255,255,.25)" />
          <circle cx="687" cy={394 + i * 26} r="4" fill="#d9c9a8" stroke={THREAD} strokeWidth="1.3" />
        </g>
      ))}
      <rect x="640" y="390" width="94" height="12" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="0.8" opacity="0" />
    </g>
  );
}

function Laptop() {
  return (
    <g>
      <rect x="468" y="274" width="122" height="72" rx="4" fill="#23272f" stroke="#3b414c" strokeWidth="2" />
      <rect x="474" y="280" width="110" height="60" rx="1" fill="#1a1d23" />
      {[[480, 288, 40, '#e9a58f'], [488, 297, 54, '#9bbd93'], [488, 306, 32, '#f3d27a'], [496, 315, 48, '#9bbd93'], [480, 324, 28, '#aebbd1']].map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height="3.4" rx="1.5" fill={c} opacity=".9" />
      ))}
      <path d="M452 346 H606 L612 352 H446 Z" fill="#c8ccd2" stroke="#6b7078" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="506" y="348" width="46" height="2.4" rx="1" fill="#9aa0a8" />
      <g transform="rotate(5 590 266)">
        <rect x="578" y="254" width="26" height="24" fill="#f2b8c6" stroke="#a8566a" strokeWidth="1" />
        <text x="581" y="265" fontSize="5.2" fill="#5a2a38" className="hand" fontWeight="700">building…</text>
        <path d="M581 270 H600 M581 274 H596" stroke="#a8566a" strokeWidth="0.8" />
      </g>
    </g>
  );
}

function Notebook() {
  return (
    <g>
      <rect x="336" y="338" width="84" height="13" rx="1.5" fill="#4a6b5c" stroke={THREAD} strokeWidth="1.6" />
      <rect x="338" y="340" width="80" height="9" fill="#f1e6cb" opacity=".35" />
      <rect x="396" y="338" width="6" height="13" fill="#c4452c" />
      <path d="M342 333 L404 334" stroke="#334d6c" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Phone() {
  return (
    <g>
      <path d="M648 352 L652 340 H686 L690 352 Z" fill="#3b4a63" stroke={THREAD} strokeWidth="1.2" />
      <g transform="rotate(-6 668 330)">
        <rect x="654" y="306" width="28" height="46" rx="5" fill="#23272f" stroke="#3b414c" strokeWidth="1.6" />
        <rect x="657" y="311" width="22" height="34" rx="2" fill="#e9d6a8" />
        <rect x="660" y="315" width="16" height="3" rx="1" fill="#8a6f35" />
        <rect x="660" y="321" width="12" height="3" rx="1" fill="#8a6f35" opacity=".6" />
        <circle cx="674" cy="338" r="3" fill="#c4452c" />
      </g>
    </g>
  );
}

function Props() {
  return (
    <g>
      <g>
        <path d="M614 352 V336 H634 V352 Z" fill="#f6efe0" stroke={THREAD} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M634 340 q8 0 8 6 t-8 6" fill="none" stroke={THREAD} strokeWidth="1.6" />
        <path d="M620 330 q-3 -6 0 -10 M628 330 q-3 -6 0 -10" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".7" />
      </g>
      <g>
        <path d="M728 350 H764 V344 H728 Z" fill="#334d6c" stroke={THREAD} strokeWidth="1.6" />
        <path d="M746 344 L732 308 L702 296" fill="none" stroke="#334d6c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M684 302 L710 286 L718 304 L694 316 Z" fill="#e3b457" stroke={THREAD} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M692 316 L722 360 L684 360 Z" fill="url(#cone)" />
      </g>
      <g>
        <rect x="426" y="338" width="30" height="14" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="1" />
        <rect x="428" y="335" width="30" height="14" fill="#f6efe0" stroke="#cfc6b0" strokeWidth="1" />
      </g>
    </g>
  );
}

function Rug() {
  return (
    <g>
      <ellipse cx="500" cy="580" rx="262" ry="46" fill="#b4574a" stroke={THREAD} strokeWidth="2" />
      <ellipse cx="500" cy="580" rx="236" ry="38" fill="none" stroke="#f1e6cb" strokeWidth="2" strokeDasharray="10 6" />
      <ellipse cx="500" cy="580" rx="196" ry="30" fill="#c96a5b" />
    </g>
  );
}

function OpenBook() {
  return (
    <g transform="rotate(-6 470 596)">
      <path d="M416 592 L470 584 L470 612 L416 618 Z" fill="#fffdf6" stroke={THREAD} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M524 592 L470 584 L470 612 L524 618 Z" fill="#f6efe0" stroke={THREAD} strokeWidth="1.6" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M424 ${597 + i * 5} L462 ${591 + i * 5} M478 ${591 + i * 5} L516 ${597 + i * 5}`} stroke="#6d675d" strokeWidth="1" opacity=".6" />)}
      <path d="M414 618 L470 612 L526 618 L526 622 L470 616 L414 622 Z" fill="#7b4a3a" />
    </g>
  );
}

function Craft() {
  const peg = [];
  for (let r = 0; r < 6; r += 1) for (let c = 0; c < 10; c += 1) peg.push([796 + c * 15, 226 + r * 17]);
  return (
    <g>
      <rect x="788" y="214" width="166" height="118" rx="3" fill="#d9c49a" stroke={THREAD} strokeWidth="2" />
      {peg.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" fill="#a98f5c" />)}
      {/* scissors */}
      <g stroke={THREAD} strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M810 236 L826 276 M826 236 L810 276" />
        <circle cx="810" cy="282" r="5" stroke="#c4452c" strokeWidth="2.4" /><circle cx="826" cy="282" r="5" stroke="#c4452c" strokeWidth="2.4" />
      </g>
      {/* tape rolls and thread */}
      {[[856, 252, '#e9a58f'], [884, 252, '#9bbd93'], [912, 252, '#aebbd1']].map(([x, y, c]) => (
        <g key={x}><circle cx={x} cy={y} r="12" fill={c} stroke={THREAD} strokeWidth="1.6" /><circle cx={x} cy={y} r="5" fill="#d9c49a" stroke={THREAD} strokeWidth="1.2" /></g>
      ))}
      <g>
        <rect x="860" y="282" width="14" height="22" rx="2" fill="#b4574a" stroke={THREAD} strokeWidth="1.4" /><rect x="858" y="279" width="18" height="4" fill="#d9c9a8" stroke={THREAD} strokeWidth="1" />
        <rect x="884" y="284" width="14" height="22" rx="2" fill="#334d6c" stroke={THREAD} strokeWidth="1.4" /><rect x="882" y="281" width="18" height="4" fill="#d9c9a8" stroke={THREAD} strokeWidth="1" />
        <rect x="908" y="286" width="14" height="22" rx="2" fill="#e3b457" stroke={THREAD} strokeWidth="1.4" /><rect x="906" y="283" width="18" height="4" fill="#d9c9a8" stroke={THREAD} strokeWidth="1" />
      </g>
      {/* floor: basket */}
      <g>
        <path d="M806 536 H934 L920 624 H820 Z" fill="#c79a62" stroke={THREAD} strokeWidth="2.2" strokeLinejoin="round" />
        {[552, 568, 584, 600, 614].map((y) => <path key={y} d={`M${808 + (y - 536) * 0.17} ${y} H${932 - (y - 536) * 0.17}`} stroke="#8d6a3b" strokeWidth="1.4" />)}
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${822 + i * 14} 536 L${828 + i * 12} 624`} stroke="#a98249" strokeWidth="1.2" />)}
        <ellipse cx="870" cy="536" rx="64" ry="9" fill="#a98249" stroke={THREAD} strokeWidth="2" />
        <circle cx="838" cy="526" r="16" fill="#c4452c" stroke={THREAD} strokeWidth="1.8" /><path d="M826 524 q12 8 24 -2 M828 532 q10 6 20 -2" stroke="#8c2e1f" strokeWidth="1.2" fill="none" />
        <circle cx="880" cy="522" r="14" fill="#e3b457" stroke={THREAD} strokeWidth="1.8" /><path d="M870 520 q10 8 20 -2" stroke="#a67a1f" strokeWidth="1.2" fill="none" />
        <g strokeLinejoin="round" stroke="#3b4a63" strokeWidth="1.2">
          <path d="M906 520 L926 492 L930 520 Z" fill="#cfd8e6" /><path d="M926 492 L944 484 L934 520 L930 520 Z" fill="#aebbd1" />
        </g>
        <path d="M852 520 L858 486 L866 520 Z" fill="#9bbd93" stroke={THREAD} strokeWidth="1.4" />
        <path d="M820 520 L812 490 M826 520 L822 486" stroke="#c4452c" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M906 528 q22 -4 18 10" stroke="#b4574a" strokeWidth="2" fill="none" />
      </g>
    </g>
  );
}

function Hoop() {
  return (
    <g transform="rotate(-12 790 570)">
      <circle cx="790" cy="570" r="30" fill="#efe3c8" stroke="#a07842" strokeWidth="5" />
      <rect x="784" y="534" width="12" height="9" rx="2" fill="#a07842" stroke={THREAD} strokeWidth="1.2" />
      <g stroke="#c4452c" strokeWidth="2" strokeLinecap="round" fill="none"><path d="M776 566 q8 -12 16 0" /><path d="M790 556 v22" strokeDasharray="3 3" /></g>
      <path d="M796 580 q10 -4 8 8" stroke="#334d6c" strokeWidth="1.6" fill="none" strokeDasharray="3 3" />
    </g>
  );
}

function Sketches() {
  return (
    <g>
      <g transform="rotate(-3 290 118)">
        <rect x="270" y="86" width="52" height="68" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="1" />
        <path d="M278 130 C288 100 304 100 314 130 M282 118 H310 M290 108 V96" fill="none" stroke="#4a4540" strokeWidth="1.1" />
        <circle cx="296" cy="90" r="3" fill="#c4452c" />
      </g>
      <g transform="rotate(4 296 194)">
        <rect x="272" y="168" width="48" height="52" fill="#fffdf6" stroke="#cfc6b0" strokeWidth="1" />
        <path d="M280 208 C288 176 304 180 312 208 M284 196 H308" fill="none" stroke="#4a4540" strokeWidth="1" />
        <circle cx="296" cy="170" r="3" fill="#334d6c" />
      </g>
    </g>
  );
}

function Scene() {
  return (
    <g>
      <rect x="14" y="10" width="972" height="664" rx="10" fill="#6d4529" stroke={THREAD} strokeWidth="3" />
      <rect x="36" y="30" width="928" height="430" fill="url(#wall)" />
      <rect x="36" y="460" width="928" height="190" fill="url(#floor)" />
      <path d="M36 460 H964" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      <rect x="36" y="450" width="928" height="12" fill="#f3e9d4" stroke={THREAD} strokeWidth="1.4" />
    </g>
  );
}

function Note({ t }) {
  const w = Math.max(...t.lines.map((l) => l.length)) * 5.6 + 22;
  const h = t.lines.length * 15 + 12;
  const y = t.y > 420 ? t.y - h - 26 : t.y + 24;
  const x = Math.min(Math.max(t.x - w / 2, 44), 956 - w);
  return (
    <g className="note" pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#fff6dc" stroke="#8a6f35" strokeWidth="1.3" />
      {t.lines.map((l, i) => (
        <text key={l} x={x + 11} y={y + 18 + i * 15} fontSize="11" fill="#3a2f18" className={i ? 'ui' : 'hand'} fontWeight={i ? 500 : 700}>{l}</text>
      ))}
    </g>
  );
}

const parts = {
  shelf: <Shelf />, board: <Board />, calendar: <Calendar />, laptop: <Laptop />, notebook: <Notebook />, phone: <Phone />,
  desk: <Desk />, drawers: <Drawers />, craft: <Craft />,
};

export default function Room({ svgRef, active, note, onOpen, onNote, onBackground }) {
  return (
    <svg ref={svgRef} className="room" viewBox="0 0 1000 700" role="group" aria-label="Hira's study room. Click an object to open that part of her portfolio." onClick={onBackground}>
      <defs>
        <pattern id="wall" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#ecdcc0" /><rect width="20" height="40" fill="#e5d3b3" />
        </pattern>
        <pattern id="floor" width="90" height="190" patternUnits="userSpaceOnUse">
          <rect width="90" height="190" fill="#b98e5e" />
          <path d="M0 0 V190 M45 0 V190" stroke="rgba(60,35,15,.35)" strokeWidth="1.4" />
          <path d="M22 0 V62 M68 50 V120 M22 120 V190" stroke="rgba(60,35,15,.25)" strokeWidth="1.2" />
        </pattern>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9cc0dd" /><stop offset="1" stopColor="#f3d29a" /></linearGradient>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".5" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></linearGradient>
        <radialGradient id="warm" cx="68%" cy="42%" r="55%"><stop offset="0" stopColor="#ffd98a" stopOpacity=".3" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%"><stop offset=".6" stopColor="#2a160a" stopOpacity="0" /><stop offset="1" stopColor="#2a160a" stopOpacity=".38" /></radialGradient>
      </defs>

      <ellipse cx="500" cy="688" rx="470" ry="10" fill="rgba(40,25,10,.25)" />
      <Scene />
      <Window />
      <Sketches />
      <Rug />
      <OpenBook />
      <Plant x={278} y={412} s={1.2} />
      <Hoop />
      <Props />

      {spots.map((s) => (
        <g
          key={s.id}
          className={`spot ${active === s.id ? 'on' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={`${s.label}: ${s.sub}`}
          onClick={(e) => { e.stopPropagation(); onOpen(s.id); }}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen(s.id))}
        >
          <g className="obj">{parts[s.id]}</g>
          <rect className="hit" x={s.x - 4} y={s.y - 4} width={s.w + 8} height={s.h + 8} rx="6" />
          <rect className="ring" x={s.x - 4} y={s.y - 4} width={s.w + 8} height={s.h + 8} rx="6" />
          <g className="tip" transform={`translate(${s.x + s.w / 2} ${Math.max(s.y - 8, 36)})`}>
            <rect x={-Math.max(s.label.length * 7.4, s.sub.length * 5.6) / 2 - 10} y="-32" width={Math.max(s.label.length * 7.4, s.sub.length * 5.6) + 20} height="32" rx="3" fill="#f6efdc" stroke="#8d7b55" strokeWidth="1.2" />
            <text y="-18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#2b2926" className="ui">{s.label}</text>
            <text y="-6" textAnchor="middle" fontSize="9.4" fill="#6d675d" className="ui">{s.sub}</text>
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
          <rect x={t.x - (t.w || 48) / 2} y={t.y - (t.h || 40) / 2} width={t.w || 48} height={t.h || 40} fill="transparent" />
          <rect className="ring" x={t.x - (t.w || 48) / 2} y={t.y - (t.h || 40) / 2} width={t.w || 48} height={t.h || 40} rx="6" />
        </g>
      ))}

      <rect x="36" y="30" width="928" height="620" fill="url(#warm)" pointerEvents="none" />
      <rect x="36" y="30" width="928" height="620" fill="url(#vignette)" pointerEvents="none" />
      {trinkets.filter((t) => t.id === note).map((t) => <Note key={t.id} t={t} />)}
    </svg>
  );
}
