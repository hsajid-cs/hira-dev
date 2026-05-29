import { useState } from 'react';
import hiraPhoto from '../assets/hira.jpg.jpg';

export default function Intro({ onEnter }) {
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);

  const handleClick = () => {
    setGone(true);
    setTimeout(() => {
      setRemoved(true);
      if (onEnter) onEnter();
    }, 1400);
  };

  if (removed) return null;

  return (
    <div
      className="intro"
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        background: '#0a0804',
        transition: 'opacity 1.2s ease',
        opacity: gone ? 0 : 1,
        pointerEvents: gone ? 'none' : 'all',
        cursor: 'pointer',
      }}
    >
      {/* Profile photo */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid rgba(200,184,144,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          opacity: 0,
          animation: 'fadeUp 1s ease 0.1s forwards',
        }}
      >
        <img
          src={hiraPhoto}
          alt="Hira Sajid"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          color: 'var(--parchment)',
          letterSpacing: '0.04em',
          opacity: 0,
          animation: 'fadeUp 1s ease 0.3s forwards',
        }}
      >
        Hira Sajid
      </div>
      <div
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--parch-dim)',
          opacity: 0,
          animation: 'fadeUp 1s ease 0.8s forwards',
        }}
      >
        software engineer · ai/ml · nust
      </div>
      <div
        style={{
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          color: 'rgba(200,184,144,0.4)',
          marginTop: '2rem',
          opacity: 0,
          animation: 'fadeUp 1s ease 1.4s forwards',
        }}
      >
        click anywhere to step inside ✦
      </div>
    </div>
  );
}
