import React from 'react';
import Cell from './Cell';
import { ICell } from '@/model/Cell';
import { MAZE } from '@/constants';

interface GridProps {
  grid: ICell[][];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${MAZE.cols}, 1fr)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
          />
        ))
      )}
    </div>
  );
};

export default Grid;