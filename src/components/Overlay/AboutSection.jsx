import { aboutData } from '../../data/portfolioData';
import hiraPhoto from '../../assets/hira.jpg.jpg';

export default function AboutSection() {
  return (
    <>
      <div className="letter-decoration">{aboutData.deco}</div>
      <div className="letter-section-title">{aboutData.title}</div>
      <div className="letter-section-sub">{aboutData.sub}</div>

      {/* Profile photo */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.2rem',
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid rgba(140,110,60,0.3)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
          <img
            src={hiraPhoto}
            alt="Hira Sajid"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {aboutData.entries.map((entry, i) => (
        <div className="letter-entry" key={i}>
          <div className="letter-entry-title">{entry.title}</div>
          {entry.meta && <div className="letter-entry-meta">{entry.meta}</div>}
          {entry.body && (
            <div className="letter-entry-body">
              {entry.body.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < entry.body.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Contact links */}
      <div className="letter-entry" style={{ borderBottom: 'none' }}>
        <div className="letter-entry-title">Contact</div>
        <div className="letter-entry-meta">Get in touch</div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '0.6rem',
        }}>
          <a
            href="mailto:hirasajid.dev@gmail.com"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              border: '0.5px solid rgba(124,95,160,0.4)',
              color: 'rgba(80,50,120,0.8)',
              background: 'rgba(124,95,160,0.07)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            ✉ email
          </a>
          <a
            href="https://linkedin.com/in/hsajid-cs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              border: '0.5px solid rgba(74,124,89,0.4)',
              color: 'rgba(40,80,50,0.8)',
              background: 'rgba(74,124,89,0.07)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            ◈ linkedin
          </a>
          <a
            href="https://github.com/hsajid-cs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '3px 10px',
              border: '0.5px solid rgba(140,110,60,0.4)',
              color: 'rgba(80,60,20,0.7)',
              background: 'rgba(140,110,60,0.07)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            ✦ github
          </a>
        </div>
      </div>
    </>
  );
}
