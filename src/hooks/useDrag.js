import { useRef, useState, useCallback, useEffect } from 'react';

export function useDrag(onClickCallback) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    didDrag: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleStart = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      dragState.current = {
        startX: clientX,
        startY: clientY,
        offsetX: clientX - rect.left,
        offsetY: clientY - rect.top,
        didDrag: false,
      };
      setIsDragging(true);
    };

    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = Math.abs(clientX - dragState.current.startX);
      const dy = Math.abs(clientY - dragState.current.startY);
      if (dx > 3 || dy > 3) {
        dragState.current.didDrag = true;
      }
      el.style.left = (clientX - dragState.current.offsetX) + 'px';
      el.style.top = (clientY - dragState.current.offsetY) + 'px';
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (!dragState.current.didDrag && onClickCallback) {
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
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      document.addEventListener('touchend', onTouchEnd);
    }

    return () => {
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
