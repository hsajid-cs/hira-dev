import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef = useRef(null);
  const pos = useRef({ x: -100, y: -100, raf: 0 });

  useEffect(() => {
    // Only show on hover-capable devices
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    document.body.style.cursor = 'none';

    const apply = () => {
      pos.current.raf = 0;
      if (curRef.current) {
        curRef.current.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    // Follow the mouse 1:1, coalescing high-frequency events into one
    // update per frame so we never do more work than the display can show.
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!pos.current.raf) {
        pos.current.raf = requestAnimationFrame(apply);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(pos.current.raf);
    };
  }, []);

  return (
    <div
      ref={curRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 20,
        height: 20,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        willChange: 'transform',
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
