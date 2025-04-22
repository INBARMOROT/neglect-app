
import React from "react";

interface TargetElementProps {
  left: number; // in %
  top: number; // in %
  color: string;
  onClick: () => void;
  visible: boolean;
}

const TargetElement: React.FC<TargetElementProps> = ({
  left,
  top,
  color,
  onClick,
  visible,
}) => {
  if (!visible) return null;
  return (
    <button
      aria-label="לחץ כאן"
      className="absolute rounded-full shadow-lg border-4 border-white text-white font-bold text-xl flex items-center justify-center transition-transform duration-150 hover:scale-110"
      onClick={onClick}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: 70,
        height: 70,
        background: color,
        zIndex: 2,
      }}
    >
      ●
    </button>
  );
};

export default TargetElement;

