import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Cell from './Cell';
import { GRID_COLS } from '@/ultis/constants';

const Grid: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
    >
      {state.grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} cell={cell} />
        ))
      )}
    </div>
  );
};

export default Grid;