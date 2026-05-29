import { researchData } from '../../data/portfolioData';

export default function ResearchSection() {
  return (
    <>
      <div className="letter-decoration">{researchData.deco}</div>
      <div className="letter-section-title">{researchData.title}</div>
      <div className="letter-section-sub">{researchData.sub}</div>
      {researchData.entries.map((entry, i) => (
        <div className="letter-entry" key={i}>
          <div className="letter-entry-title">{entry.title}</div>
          {entry.meta && <div className="letter-entry-meta">{entry.meta}</div>}
          {entry.body && <div className="letter-entry-body">{entry.body}</div>}
        </div>
      ))}
    </>
  );
}
