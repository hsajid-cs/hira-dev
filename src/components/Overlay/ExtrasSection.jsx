import { certificationsData } from '../../data/portfolioData';

export default function CertificationsSection() {
  return (
    <>
      <div className="letter-decoration">{certificationsData.deco}</div>
      <div className="letter-section-title">{certificationsData.title}</div>
      <div className="letter-section-sub">{certificationsData.sub}</div>
      {certificationsData.entries.map((entry, i) => (
        <div className="letter-entry" key={i}>
          <div className="letter-entry-title">{entry.title}</div>
          {entry.meta && <div className="letter-entry-meta">{entry.meta}</div>}
          {entry.body && <div className="letter-entry-body">{entry.body}</div>}
        </div>
      ))}
    </>
  );
}
