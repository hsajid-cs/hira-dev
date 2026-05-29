export default function Envelope() {
  return (
    <div className="envelope-wrap">
      <div className="envelope-label">open me ✦</div>
      <div className="envelope">
        <svg className="envelope-wax" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="#3a1a5a" opacity="0.95" />
          <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(160,124,200,0.5)" strokeWidth="0.8" />
          <text
            x="20" y="25"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="14"
            fill="rgba(201,168,76,0.9)"
          >
            ✦
          </text>
        </svg>
      </div>
      <div className="envelope-label">about me</div>
    </div>
  );
}
