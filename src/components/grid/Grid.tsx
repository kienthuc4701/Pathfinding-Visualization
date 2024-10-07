import { useGrid } from '@/hooks/useGrid';
import { CellType } from '@/model/Cell';
import React from 'react';

const Grid: React.FC = () => {
  const { grid, updateCell } = useGrid();


  const getCellClassName = (type: CellType) => {
    switch (type) {
      case CellType.WALL:
        return 'bg-gray-800';
      case CellType.START:
        return 'bg-green-500';
      case CellType.END:
        return 'bg-red-500';
      case CellType.PATH:
        return 'bg-yellow-300';
      case CellType.VISITED:
        return 'bg-blue-200';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-6 h-6 border ${getCellClassName(cell.type)}`}
            onClick={() => updateCell(rowIndex, colIndex, cell.type === CellType.WALL ? CellType.BASIC : CellType.WALL)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;