import React from 'react';
import AlgorithmSelector from './AlgorithmsSelector';
import { MazeAlgorithmType } from '@/model/Algorithm';
import { MAZE } from '@/constants';

interface ControlPanelProps {
  mazeAlgorithm:MazeAlgorithmType;
  setMazeAlgorithm: (value: MazeAlgorithmType) => void;
  pathAlgorithm: string;
  setPathAlgorithm: (value: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mazeAlgorithm,
  setMazeAlgorithm,
  pathAlgorithm,
  setPathAlgorithm,
}) => {
  
  const handleMazeAlgorithmChange = (value: MazeAlgorithmType) => {
    setMazeAlgorithm(value);
  };


  return (
    <div className="mb-4 flex space-x-4 items-center">
      <AlgorithmSelector
        label="Maze Algorithm:"
        value={mazeAlgorithm}
        onChange={handleMazeAlgorithmChange}
        options={MAZE.options}
      />
      {/* <AlgorithmSelector
        label="Path Algorithm:"
        value={pathAlgorithm}
        onChange={setPathAlgorithm}
        options={pathOptions}
      /> */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Start Visualization
      </button>
      {/* <SpeedControl speed={speed} onChange={setSpeed} /> */}
    </div>
  );
};

export default ControlPanel;