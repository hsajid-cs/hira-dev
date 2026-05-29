import { useState, useCallback } from 'react';
import { projectsData } from '../../data/portfolioData';
import { useSwipe } from '../../hooks/useSwipe';
import '../../styles/deck.css';

export default function ProjectsDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = projectsData.entries;

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    if (index === activeIndex) {
      return {
        transform: 'translateY(0) rotate(0deg) scale(1)',
        zIndex: 40,
        opacity: 1,
      };
    }

    // Stack cards behind with slight offset
    const yOffset = absOffset * 8;
    const rotation = offset * 2;
    const scale = 1 - absOffset * 0.04;
    const xOffset = offset * 6;

    return {
      transform: `translateY(${yOffset}px) translateX(${xOffset}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex: 40 - absOffset * 5,
      opacity: Math.max(0.3, 1 - absOffset * 0.25),
    };
  };

  const next = useCallback(() => {
    setActiveIndex(i => Math.min(i + 1, cards.length - 1));
  }, [cards.length]);

  const prev = useCallback(() => {
    setActiveIndex(i => Math.max(i - 1, 0));
  }, []);

  // Swipe support
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(next, prev);

  return (
    <div
      className="deck-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="letter-decoration">{projectsData.deco}</div>
      <div className="letter-section-title">{projectsData.title}</div>
      <div className="letter-section-sub">{projectsData.sub}</div>

      <div className="deck-stack">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`deck-card ${index === activeIndex ? 'active' : ''}`}
            style={getCardStyle(index)}
            onClick={() => setActiveIndex(index)}
          >
            <div className={`deck-card-accent ${card.tagsType === 'purple' ? 'purple' : ''}`} />
            <div className="deck-card-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="deck-card-title">{card.title}</div>
            <div className="deck-card-meta">{card.meta}</div>
            <div className="deck-card-body">{card.body}</div>
            <div className="deck-card-tags">
              {card.tags && card.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className={`deck-card-tag ${card.tagsType === 'purple' ? 'purple' : ''}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="deck-dots">
        {cards.map((_, i) => (
          <button
            key={i}
            className={`deck-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <div className="deck-nav">
        <button className="deck-nav-btn" onClick={prev} disabled={activeIndex === 0}>
          ←
        </button>
        <button className="deck-nav-btn" onClick={next} disabled={activeIndex === cards.length - 1}>
          →
        </button>
      </div>
    </div>
  );
}
