import React from 'react';

interface SpeedControlProps {
  speed: number;
  onChange: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ speed, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="range"
        min="1"
        max="100"
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 mr-2"
      />
      <span>Speed: {speed}</span>
    </div>
  );
};

export default SpeedControl;