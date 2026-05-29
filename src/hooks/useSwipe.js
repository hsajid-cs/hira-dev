import { useRef, useCallback } from 'react';

export function useSwipe(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    touchEnd.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchMove = useCallback((e) => {
    const t = e.touches[0];
    touchEnd.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(() => {
    const dx = touchStart.current.x - touchEnd.current.x;
    const dy = Math.abs(touchStart.current.y - touchEnd.current.y);

    // Only trigger if horizontal swipe is dominant
    if (Math.abs(dx) > threshold && Math.abs(dx) > dy) {
      if (dx > 0 && onSwipeLeft) {
        onSwipeLeft();  // swiped left → next
      } else if (dx < 0 && onSwipeRight) {
        onSwipeRight(); // swiped right → prev
      }
    }
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
