import { extrasData } from '../../data/portfolioData';

export default function ExtrasSection() {
  return (
    <>
      <div className="letter-decoration">{extrasData.deco}</div>
      <div className="letter-section-title">{extrasData.title}</div>
      <div className="letter-section-sub">{extrasData.sub}</div>
      {extrasData.entries.map((entry, i) => (
        <div className="letter-entry" key={i}>
          <div className="letter-entry-title">{entry.title}</div>
          {entry.meta && <div className="letter-entry-meta">{entry.meta}</div>}
          {entry.body && <div className="letter-entry-body">{entry.body}</div>}
        </div>
      ))}
    </>
  );
}
