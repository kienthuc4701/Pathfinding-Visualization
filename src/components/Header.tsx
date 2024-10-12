import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { MAZE_ALGORITHMS, PATH_ALGORITHMS, SPEEDS } from '@/ultis/constants';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Pathfinding Visualizer</h1>
        <nav className="flex flex-wrap gap-2">
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={state.pathAlgorithm}
            onChange={(e) => dispatch({ type: 'SET_PATH_ALGORITHM', payload: e.target.value })}
          >
            {Object.entries(PATH_ALGORITHMS).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={state.mazeAlgorithm}
            onChange={(e) => dispatch({ type: 'SET_MAZE_ALGORITHM', payload: e.target.value })}
          >
            {Object.entries(MAZE_ALGORITHMS).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={state.speed}
            onChange={(e) => dispatch({ type: 'SET_SPEED', payload: parseInt(e.target.value) })}
          >
            {Object.entries(SPEEDS).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => dispatch({ type: 'RESET_GRID' })}
          >
            Clear Board
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;