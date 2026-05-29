import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const pos = useRef({ cx: 0, cy: 0, tx: 0, ty: 0 });

  useEffect(() => {
    // Only show on hover-capable devices
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    document.body.style.cursor = 'none';

    const onMove = (e) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };

    document.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      const p = pos.current;
      p.cx += (p.tx - p.cx) * 0.18;
      p.cy += (p.ty - p.cy) * 0.18;
      if (curRef.current) {
        curRef.current.style.left = p.cx + 'px';
        curRef.current.style.top = p.cy + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={curRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        width: 20,
        height: 20,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.15s ease',
        mixBlendMode: 'screen',
      }}
    >
      <svg viewBox="0 0 20 20" fill="none" width="100%" height="100%">
        <path
          d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z"
          fill="rgba(200,184,144,0.8)"
          stroke="rgba(200,184,144,0.2)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
