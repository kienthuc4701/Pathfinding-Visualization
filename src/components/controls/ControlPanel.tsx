import React from 'react';
import AlgorithmSelector from './AlgorithmsSelector';

interface ControlPanelProps {
  mazeAlgorithm: string;
  setMazeAlgorithm: (value: string) => void;
  pathAlgorithm: string;
  setPathAlgorithm: (value: string) => void;
  speed: number;
  setSpeed: (value: number) => void;
  onGenerateMaze: (algorithm: string) => void;
  onVisualizePath: () => void;
  isRunning: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mazeAlgorithm,
  setMazeAlgorithm,
  pathAlgorithm,
  setPathAlgorithm,
  onGenerateMaze,
  onVisualizePath,
  isRunning,
}) => {
  const mazeOptions = [
    { value: 'basic', label: 'Basic Maze' },
    { value: 'random', label: 'Random Maze' },
    { value: 'binaryTree', label: 'Binary Tree Maze' },
    { value: 'recursiveDivision', label: 'Recursive Division Maze' },
  ];

  const pathOptions = [
    { value: 'dijkstra', label: 'Dijkstra' },
    { value: 'aStar', label: 'A*' },
    { value: 'bfs', label: 'BFS' },
    { value: 'dfs', label: 'DFS' },
  ];

  const handleMazeAlgorithmChange = (value: string) => {
    setMazeAlgorithm(value);
    onGenerateMaze(value);
  };

  return (
    <div className="mb-4 flex space-x-4 items-center">
      <AlgorithmSelector
        label="Maze Algorithm:"
        value={mazeAlgorithm}
        onChange={handleMazeAlgorithmChange}
        options={mazeOptions}
      />
      <AlgorithmSelector
        label="Path Algorithm:"
        value={pathAlgorithm}
        onChange={setPathAlgorithm}
        options={pathOptions}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={onVisualizePath}
        disabled={isRunning}
      >
        Start Visualization
      </button>
      {/* <SpeedControl speed={speed} onChange={setSpeed} /> */}
    </div>
  );
};

export default ControlPanel;