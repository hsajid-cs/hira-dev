import { useEffect } from 'react';
import '../../styles/overlay.css';
import AboutSection from './AboutSection';
import ExperienceBook from './ExperienceBook';
import ProjectsDeck from './ProjectsDeck';
import ResearchSection from './ResearchSection';
import ExtrasSection from './ExtrasSection';
import WallOfLove from './WallOfLove';

const sectionComponents = {
  about: AboutSection,
  projects: ProjectsDeck,
  experience: ExperienceBook,
  research: ResearchSection,
  love: WallOfLove,
  extras: ExtrasSection,
};

// Sections that use the letter wrapper vs custom full layouts
const letterSections = ['about', 'research', 'extras'];

export default function LetterOverlay({ section, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const SectionComponent = sectionComponents[section];
  const useLetter = letterSections.includes(section);

  if (!SectionComponent) return null;

  // Click on the overlay container itself (outside the letter) closes it
  const handleOverlayClick = (e) => {
    // Only close if the click is directly on the overlay or overlay-bg, not on the letter content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`overlay ${section ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="overlay-bg" onClick={onClose} />
      <div className="letter-wrap" onClick={handleOverlayClick}>
        {useLetter ? (
          <div className="letter" onClick={(e) => e.stopPropagation()}>
            <button className="letter-close" onClick={onClose}>
              ✕ &nbsp; fold back
            </button>
            <div className="letter-flap" />
            <div className="letter-body">
              <SectionComponent />
            </div>
          </div>
        ) : (
          <div className="letter" style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <button className="letter-close" onClick={onClose}>
              ✕ &nbsp; close
            </button>
            <div className="letter-body" style={{ padding: '1rem 1.5rem 1.5rem' }}>
              <SectionComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
