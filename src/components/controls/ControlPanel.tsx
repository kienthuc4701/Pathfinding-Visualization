import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { MAZE_ALGORITHMS, PATH_ALGORITHMS } from '@/ultis/constants';
import AlgorithmSelector from './AlgorithmsSelector';

interface ControlPanelProps {
  onVisualize: () => void;
  onGenerateMaze: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onVisualize,
  onGenerateMaze,
}) => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="mb-4 flex space-x-4 items-center">
      <AlgorithmSelector
        label="Maze Algorithm:"
        value={state.mazeAlgorithm}
        onChange={(value) => dispatch({ type: 'SET_MAZE_ALGORITHM', payload: value })}
        options={Object.entries(MAZE_ALGORITHMS).map(([key, value]) => ({ value, label: key }))}
        disabled={state.isVisualizing}
      />
      <AlgorithmSelector
        label="Path Algorithm:"
        value={state.pathAlgorithm}
        onChange={(value) => dispatch({ type: 'SET_PATH_ALGORITHM', payload: value })}
        options={Object.entries(PATH_ALGORITHMS).map(([key, value]) => ({ value, label: key }))}
        disabled={state.isVisualizing}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={onGenerateMaze}
        disabled={state.isVisualizing}
      >
        Generate Maze
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={onVisualize}
        disabled={state.isVisualizing}
      >
        Visualize Path
      </button>
    </div>
  );
};

export default ControlPanel;