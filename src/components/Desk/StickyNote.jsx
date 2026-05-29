import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function StickyNote() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <div className="sticky-note">
        <div className="sticky-note-text">
          {isMobile
            ? 'Volunteering'
            : 'Community Engagement'}
        </div>
        {!isMobile && <div className="sticky-note-by">service & outreach ✦</div>}
      </div>
      <div className="sticky-label">volunteering</div>
    </div>
  );
}
