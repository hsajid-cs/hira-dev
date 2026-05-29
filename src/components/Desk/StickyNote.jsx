import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function StickyNote() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <div className="sticky-note">
        <div className="sticky-note-text">
          {isMobile
            ? 'wall of love'
            : '"she debugged my life &amp; my code in one afternoon"'}
        </div>
        {!isMobile && <div className="sticky-note-by">— a friend ✦</div>}
      </div>
      <div className="sticky-label">wall of love</div>
    </div>
  );
}
