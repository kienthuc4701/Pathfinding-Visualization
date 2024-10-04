import React from 'react';
import Cell from './Cell';
import { ICell } from '@/model/Cell';
import { MAZE } from '@/constants';

interface GridProps {
  grid: ICell[][];
  onCellClick: (row: number, col: number) => void;
  onDragStart: (row: number, col: number) => void;
  onDragEnter: (row: number, col: number) => void;
  onDragEnd: () => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick, onDragStart, onDragEnter, onDragEnd }) => {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${MAZE.cols}, 1fr)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onDragStart={() => onDragStart(rowIndex, colIndex)}
            onDragEnter={() => onDragEnter(rowIndex, colIndex)}
            onDragEnd={onDragEnd}
          />
        ))
      )}
    </div>
  );
};

export default Grid;