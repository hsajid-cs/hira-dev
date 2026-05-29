import { volunteeringData } from '../../data/portfolioData';

export default function VolunteeringSection() {
  return (
    <>
      <div className="letter-decoration">{volunteeringData.deco}</div>
      <div className="letter-section-title">{volunteeringData.title}</div>
      <div className="letter-section-sub">{volunteeringData.sub}</div>
      {volunteeringData.entries.map((entry, i) => (
        <div className="letter-entry" key={i}>
          <div className="letter-entry-title">{entry.title}</div>
          {entry.meta && <div className="letter-entry-meta">{entry.meta}</div>}
          {entry.body && <div className="letter-entry-body">{entry.body}</div>}
        </div>
      ))}
    </>
  );
}
