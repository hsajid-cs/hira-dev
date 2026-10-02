// Five small origami figures drawn as flat facets. Until a section has been opened
// the figure stays pale and creased; opening it "finishes" the fold and colours it in.
const pt = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
};

function Flower() {
  return (
    <>
      {[-90, -18, 54, 126, 198].map((a, i) => (
        <g key={a}>
          <polygon className={i % 2 ? 'f3' : 'f1'} points={`50,52 ${pt(50, 52, 22, a - 30)} ${pt(50, 52, 42, a)}`} />
          <polygon className={i % 2 ? 'f4' : 'f2'} points={`50,52 ${pt(50, 52, 42, a)} ${pt(50, 52, 22, a + 30)}`} />
        </g>
      ))}
      <circle className="f5" cx="50" cy="52" r="7" />
    </>
  );
}

const shapes = {
  flower: <Flower />,
  box: (
    <>
      <polygon className="f1" points="12,12 88,12 70,30 30,30" />
      <polygon className="f2" points="88,12 88,88 70,70 70,30" />
      <polygon className="f3" points="12,88 88,88 70,70 30,70" />
      <polygon className="f4" points="12,12 30,30 30,70 12,88" />
      <rect className="f5" x="30" y="30" width="40" height="40" />
    </>
  ),
  accordion: (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const x0 = 10 + i * 13.4;
        const x1 = x0 + 13.4;
        const a = i % 2 ? 26 : 14;
        const b = i % 2 ? 14 : 26;
        return <polygon key={i} className={i % 2 ? 'f2' : 'f1'} points={`${x0},${a} ${x1},${b} ${x1},${b + 52} ${x0},${a + 52}`} />;
      })}
    </>
  ),
  crane: (
    <>
      <polygon className="f3" points="30,58 8,68 36,65" />
      <polygon className="f2" points="46,56 28,14 64,50" />
      <polygon className="f1" points="30,58 62,48 52,84" />
      <polygon className="f4" points="40,60 76,20 62,62" />
      <polygon className="f3" points="62,48 86,34 68,58" />
      <polygon className="f5" points="86,34 96,37 88,42" />
    </>
  ),
  envelope: (
    <>
      <rect className="f1" x="10" y="26" width="80" height="52" />
      <polygon className="f3" points="10,26 10,78 50,54" />
      <polygon className="f3" points="90,26 90,78 50,54" />
      <polygon className="f2" points="10,78 90,78 50,50" />
      <polygon className="f4" points="10,26 90,26 50,60" />
      <circle className="f5" cx="50" cy="58" r="4" />
    </>
  ),
};

export default function Origami({ kind, done = false, size = 88 }) {
  return (
    <svg className={`origami o-${kind} ${done ? 'done' : ''}`} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {shapes[kind]}
    </svg>
  );
}
