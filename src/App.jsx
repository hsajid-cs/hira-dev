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

  const deskItems = useMemo(() => [
    {
      id: 'item-about',
      section: 'about',
      left: '12%',
      top: '18%',
      mobileLeft: '10%',
      mobileTop: '16%',
      mobileRotation: -4.5,
      rotation: rotations[0],
      Component: Envelope,
    },
    {
      id: 'item-projects',
      section: 'projects',
      left: '34%',
      top: '12%',
      mobileLeft: '52%',
      mobileTop: '10%',
      mobileRotation: 3.8,
      rotation: rotations[1],
      Component: Notebook,
    },
    {
      id: 'item-experience',
      section: 'experience',
      left: '58%',
      top: '20%',
      mobileLeft: '12%',
      mobileTop: '48%',
      mobileRotation: -2.4,
      rotation: rotations[2],
      Component: Scroll,
    },
    {
      id: 'item-research',
      section: 'research',
      left: '20%',
      top: '55%',
      mobileLeft: '56%',
      mobileTop: '38%',
      mobileRotation: 2.6,
      rotation: rotations[3],
      Component: () => <Postcard variant="default" />,
    },
    {
      id: 'item-volunteering',
      section: 'volunteering',
      left: '50%',
      top: '58%',
      mobileLeft: '26%',
      mobileTop: '72%',
      mobileRotation: -3.6,
      rotation: rotations[4],
      Component: StickyNote,
    },
    {
      id: 'item-certifications',
      section: 'certifications',
      left: '74%',
      top: '52%',
      mobileLeft: '62%',
      mobileTop: '70%',
      mobileRotation: 1.8,
      rotation: rotations[5],
      Component: () => <Postcard variant="green" />,
    },
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
          {deskItems.map(({
            id,
            section,
            left,
            top,
            mobileLeft,
            mobileTop,
            mobileRotation,
            rotation,
            Component,
          }) => (
            <DeskItem
              key={id}
              id={id}
              section={section}
              style={
                isMobile
                  ? { left: mobileLeft, top: mobileTop, transform: `rotate(${mobileRotation || 0}deg)` }
                  : { left, top }
              }
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
            Drag to rearrange · Click to open
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
