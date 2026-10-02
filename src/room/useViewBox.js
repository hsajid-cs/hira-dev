import { useCallback, useRef } from 'react';

// Animates the SVG viewBox so the whole jacket can zoom toward a patch and back.
export function useViewBox(full) {
  const svgRef = useRef(null);
  const cur = useRef(full);
  const raf = useRef(0);

  const set = (v) => {
    cur.current = v;
    svgRef.current?.setAttribute('viewBox', v.map((n) => n.toFixed(2)).join(' '));
  };

  const goTo = useCallback((target, ms = 520) => {
    cancelAnimationFrame(raf.current);
    const from = cur.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return set(target);
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, Math.max(0, (now - t0) / ms));
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      set(from.map((v, i) => v + (target[i] - v) * e));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  return { svgRef, goTo };
}
