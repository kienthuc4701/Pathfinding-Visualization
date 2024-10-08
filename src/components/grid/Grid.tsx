import { MAZE } from "@/constants";
import { useMaze } from "@/hooks/useMaze";
import { CellType } from "@/model/Cell";
import React from "react";

const Grid: React.FC = () => {
  const { grid, updateCell } = useMaze();

  const getCellClassName = (type: CellType) => {
    switch (type) {
      case CellType.WALL:
        return "bg-gray-800";
      case CellType.START:
        return "bg-green-500";
      case CellType.END:
        return "bg-red-500";
      case CellType.PATH:
        return "bg-yellow-300";
      case CellType.VISITED:
        return "bg-blue-200";
      default:
        return "bg-white";
    }
  };
  const handleCellClick = (row: number, col: number, currentType: CellType) => {
    if (currentType !== CellType.START && currentType !== CellType.END) {
      const newType =
        currentType === CellType.WALL ? CellType.BASIC : CellType.WALL;
      updateCell(row, col, newType);
    }
  };
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${MAZE.cols}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-6 h-6 border ${getCellClassName(cell.type)}`}
            onClick={() => handleCellClick(rowIndex, colIndex, cell.type)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
