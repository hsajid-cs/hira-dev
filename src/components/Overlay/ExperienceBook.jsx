import { useState, useCallback } from 'react';
import { experienceData } from '../../data/portfolioData';
import '../../styles/book.css';

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export default function ExperienceBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animClass, setAnimClass] = useState('entering');

  const totalPages = experienceData.entries.length + 1; // +1 for cover

  const goToPage = useCallback((newPage, direction) => {
    setAnimClass(direction === 'next' ? 'turning-left' : 'turning-right');
    setTimeout(() => {
      setCurrentPage(newPage);
      setAnimClass('entering');
    }, 300);
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1, 'next');
  };

  const prevPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1, 'prev');
  };

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.stopPropagation();
      nextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.stopPropagation();
      prevPage();
    }
  }, [currentPage, totalPages]);

  return (
    <div className="book-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="letter-decoration">{experienceData.deco}</div>
      <div className="letter-section-title">{experienceData.title}</div>
      <div className="letter-section-sub">{experienceData.sub}</div>

      <div className="book">
        <div className={`book-page-wrapper ${animClass}`}>
          {currentPage === 0 ? (
            <div className="book-cover">
              <div className="book-cover-deco">· · ✦ · ·</div>
              <div className="book-cover-title">The Journey So Far</div>
              <div className="book-cover-deco">❧</div>
              <div className="book-cover-sub">{experienceData.entries.length} chapters</div>
            </div>
          ) : (
            <div className="book-page">
              <div className="book-page-chapter">
                Chapter {romanNumerals[currentPage - 1]}
              </div>
              <div className="book-page-title">
                {experienceData.entries[currentPage - 1].title}
              </div>
              <div className="book-page-meta">
                {experienceData.entries[currentPage - 1].meta}
              </div>
              <div className="book-page-body">
                {experienceData.entries[currentPage - 1].body}
              </div>
              <div className="book-page-number">
                {currentPage}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="book-nav">
        <button
          className="book-nav-btn"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          ← prev
        </button>
        <span className="book-nav-indicator">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          className="book-nav-btn"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
        >
          next →
        </button>
      </div>
    </div>
  );
}
