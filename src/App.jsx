import { useState, useMemo, useCallback } from 'react';
import Cursor from './components/Cursor';
import Intro from './components/Intro';
import DeskSurface from './components/Desk/DeskSurface';
import DeskItem from './components/Desk/DeskItem';
import Envelope from './components/Desk/Envelope';
import Notebook from './components/Desk/Notebook';
import Scroll from './components/Desk/Scroll';
import Postcard from './components/Desk/Postcard';
import StickyNote from './components/Desk/StickyNote';
import Candle from './components/Desk/Candle';
import LetterOverlay from './components/Overlay/LetterOverlay';
import { useMediaQuery } from './hooks/useMediaQuery';
import './styles/desk.css';
import './styles/mobile.css';

// Generate random rotations for desk items (organic feel)
const rotations = Array.from({ length: 6 }, () => (Math.random() - 0.5) * 6);

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const openSection = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const closeSection = useCallback(() => {
    setActiveSection(null);
  }, []);

  // Desktop positions for desk items
  const deskItems = useMemo(() => [
    { id: 'item-about', section: 'about', left: '12%', top: '18%', rotation: rotations[0], Component: Envelope },
    { id: 'item-projects', section: 'projects', left: '34%', top: '12%', rotation: rotations[1], Component: Notebook },
    { id: 'item-experience', section: 'experience', left: '58%', top: '20%', rotation: rotations[2], Component: Scroll },
    { id: 'item-research', section: 'research', left: '20%', top: '55%', rotation: rotations[3], Component: () => <Postcard variant="default" /> },
    { id: 'item-love', section: 'love', left: '50%', top: '58%', rotation: rotations[4], Component: StickyNote },
    { id: 'item-extras', section: 'extras', left: '74%', top: '52%', rotation: rotations[5], Component: () => <Postcard variant="green" /> },
  ], []);

  return (
    <>
      <Cursor />
      <Intro />

      <div className="desk">
        <DeskSurface />

        {/* Candle */}
        <div
          className="candle-container"
          style={
            isMobile
              ? {}
              : { position: 'absolute', bottom: 60, right: 80, zIndex: 8 }
          }
        >
          <Candle />
        </div>

        {/* Desk items */}
        <div className="desk-items-container">
          {deskItems.map(({ id, section, left, top, rotation, Component }) => (
            <DeskItem
              key={id}
              id={id}
              section={section}
              style={{ left, top }}
              rotation={rotation}
              onClick={openSection}
            >
              <Component />
            </DeskItem>
          ))}
        </div>

        {/* Scatter hint */}
        {!isMobile && (
          <div className="scatter-hint">
            drag things around · click to open
          </div>
        )}
      </div>

      {/* Overlay */}
      {activeSection && (
        <LetterOverlay section={activeSection} onClose={closeSection} />
      )}
    </>
  );
}
