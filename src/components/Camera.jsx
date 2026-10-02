// An old instant camera, drawn flat. The red button is the shutter.
export default function Camera({ left, slotRef, onShoot, shaking }) {
  return (
    <div className={`camera ${shaking ? 'shake' : ''}`}>
      <svg viewBox="0 0 400 360" role="img" aria-label="An old instant camera">
        <defs>
          <radialGradient id="glass" cx="38%" cy="34%" r="70%">
            <stop offset="0" stopColor="#5b7aa6" />
            <stop offset=".45" stopColor="#1b2a44" />
            <stop offset="1" stopColor="#080c16" />
          </radialGradient>
          <linearGradient id="leather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4730" />
            <stop offset="1" stopColor="#4a2f1e" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="344" rx="170" ry="10" fill="rgba(0,0,0,.35)" />
        <rect x="104" y="34" width="190" height="62" rx="16" fill="#e4dac2" stroke="#2a1d12" strokeWidth="3" />
        <rect x="16" y="66" width="368" height="266" rx="40" fill="#efe6d2" stroke="#2a1d12" strokeWidth="3.5" />
        <path d="M16 206 H384 V292 Q384 332 344 332 H56 Q16 332 16 292 Z" fill="url(#leather)" stroke="#2a1d12" strokeWidth="3.5" />
        <path d="M30 218 H370" stroke="rgba(255,255,255,.12)" strokeWidth="2" strokeDasharray="6 5" />
        <rect x="40" y="90" width="92" height="48" rx="8" fill="#d8cfb6" stroke="#2a1d12" strokeWidth="2.5" />
        <rect x="48" y="97" width="76" height="34" rx="4" fill="#fff4c8" />
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${60 + i * 12} 97 V131`} stroke="#e6d9a0" strokeWidth="2" />)}
        <rect x="306" y="94" width="56" height="44" rx="6" fill="#1b2330" stroke="#2a1d12" strokeWidth="2.5" />
        <path d="M312 100 L340 100 L312 124Z" fill="rgba(255,255,255,.14)" />
        <rect x="150" y="104" width="24" height="12" rx="2" fill="#2a1d12" />
        <circle cx="200" cy="206" r="88" fill="#2a1d12" />
        <circle cx="200" cy="206" r="78" fill="#4a4a52" />
        <circle cx="200" cy="206" r="64" fill="#1c1c22" />
        <circle cx="200" cy="206" r="54" fill="url(#glass)" />
        <ellipse cx="180" cy="186" rx="16" ry="10" fill="rgba(255,255,255,.5)" transform="rotate(-30 180 186)" />
        <circle cx="222" cy="226" r="6" fill="rgba(255,255,255,.18)" />
        <rect x="58" y="160" width="52" height="24" rx="4" fill="#1b2330" stroke="#2a1d12" strokeWidth="2" />
        <text x="84" y="177" textAnchor="middle" fontSize="15" fontFamily="DM Sans, sans-serif" fontWeight="700" fill="#ffd98a">{String(left).padStart(2, '0')}</text>
        <rect x="108" y="296" width="184" height="16" rx="8" fill="#150e08" />
        <rect ref={slotRef} x="112" y="300" width="176" height="8" rx="4" fill="#33231a" />
      </svg>
      <button type="button" className="shutter" onClick={onShoot} disabled={left === 0} aria-label={left === 0 ? 'Out of film' : 'Take a photo'}>
        <span />
      </button>
    </div>
  );
}
