import { useRef, useState, useEffect } from 'react';

export function useDrag(onClickCallback) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    startX: 0,
    startY: 0,
    // Translation committed by previous drags
    baseX: 0,
    baseY: 0,
    // Translation of the drag in progress
    dx: 0,
    dy: 0,
    didDrag: false,
    // The element's original transform (its rotation), captured on first drag
    baseTransform: null,
    raf: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = dragState.current;

    // Moving via transform instead of left/top keeps the drag on the
    // compositor — no layout or drop-shadow repaint per mouse event.
    const applyTransform = () => {
      s.raf = 0;
      el.style.transform =
        `translate3d(${s.baseX + s.dx}px, ${s.baseY + s.dy}px, 0) ${s.baseTransform}`;
    };

    const handleStart = (clientX, clientY) => {
      if (s.baseTransform === null) {
        s.baseTransform = el.style.transform || '';
      }
      s.startX = clientX;
      s.startY = clientY;
      s.dx = 0;
      s.dy = 0;
      s.didDrag = false;
      setIsDragging(true);
    };

    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      s.dx = clientX - s.startX;
      s.dy = clientY - s.startY;
      if (Math.abs(s.dx) > 3 || Math.abs(s.dy) > 3) {
        s.didDrag = true;
      }
      if (!s.raf) {
        s.raf = requestAnimationFrame(applyTransform);
      }
    };

    const handleEnd = () => {
      if (s.raf) {
        cancelAnimationFrame(s.raf);
      }
      if (s.didDrag) {
        s.baseX += s.dx;
        s.baseY += s.dy;
      }
      s.dx = 0;
      s.dy = 0;
      applyTransform();
      setIsDragging(false);
      if (!s.didDrag && onClickCallback) {
        onClickCallback();
      }
    };

    // Mouse events
    const onMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    // Touch events
    const onTouchStart = (e) => {
      const t = e.touches[0];
      handleStart(t.clientX, t.clientY);
    };
    const onTouchMove = (e) => {
      const t = e.touches[0];
      handleMove(t.clientX, t.clientY);
    };
    const onTouchEnd = () => handleEnd();

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: true });

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      document.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
      }
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, onClickCallback]);

  return { ref, isDragging };
}
