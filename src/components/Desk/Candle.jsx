export default function Candle() {
  return (
    <div className="candle" style={{ position: 'relative' }}>
      <div className="candle-glow" />
      <div className="candle-flame" />
      <div className="candle-body">
        <div className="candle-drip" />
      </div>
    </div>
  );
}
