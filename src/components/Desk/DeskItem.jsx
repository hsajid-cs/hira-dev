import { useDrag } from '../../hooks/useDrag';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function DeskItem({ id, style, section, onClick, rotation, children }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { ref, isDragging } = useDrag(
    isMobile ? null : () => onClick && onClick(section)
  );

  const handleMobileClick = () => {
    if (isMobile && onClick) {
      onClick(section);
    }
  };

  const itemStyle = isMobile
    ? { ...style }
    : {
        ...style,
        transform: `rotate(${rotation || 0}deg)`,
      };

  return (
    <div
      ref={isMobile ? null : ref}
      className={`item ${isDragging ? 'dragging' : ''}`}
      id={id}
      style={itemStyle}
      onClick={handleMobileClick}
    >
      {children}
    </div>
  );
}
