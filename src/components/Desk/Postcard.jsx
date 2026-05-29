export default function Postcard({ variant = 'default' }) {
  const isGreen = variant === 'green';

  const cardStyle = isGreen
    ? {
        transform: 'rotate(3deg)',
        background: 'linear-gradient(135deg, #1a2e1a, #0f1f0f)',
        borderColor: 'rgba(74,124,89,0.3)',
      }
    : {};

  const stampStyle = isGreen
    ? {
        background: 'linear-gradient(135deg, #1a3a1a, #2a4a2a)',
        borderColor: 'rgba(74,124,89,0.3)',
        color: 'var(--green-l)',
      }
    : {};

  const lineStyle = isGreen
    ? { borderColor: 'rgba(74,124,89,0.2)' }
    : {};

  const addressLineColor = isGreen
    ? 'rgba(74,124,89,0.15)'
    : undefined;

  const labelColor = isGreen
    ? 'rgba(106,170,122,0.5)'
    : undefined;

  const titleColor = isGreen
    ? 'var(--green-l)'
    : undefined;

  return (
    <div>
      <div className="postcard" style={cardStyle}>
        <div className="postcard-line" style={lineStyle} />
        <div className="postcard-stamp" style={stampStyle}>
          {isGreen ? '✿' : '⁕'}
        </div>
        <div className="postcard-lines">
          <span style={addressLineColor ? { background: addressLineColor } : {}} />
          <span style={addressLineColor ? { background: addressLineColor } : {}} />
          <span style={addressLineColor ? { background: addressLineColor } : {}} />
        </div>
        <div className="postcard-content">
          <div className="postcard-content-label" style={labelColor ? { color: labelColor } : {}}>
            {isGreen ? 'beyond code' : 'field notes'}
          </div>
          <div className="postcard-content-title" style={titleColor ? { color: titleColor } : {}}>
            {isGreen ? 'extras & certs' : 'research work'}
          </div>
        </div>
      </div>
      <div className="postcard-label">
        {isGreen ? 'extracurriculars' : 'research'}
      </div>
    </div>
  );
}
