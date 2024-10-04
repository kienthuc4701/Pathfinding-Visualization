import React from "react";
import Cell from "./Cell";
import { ICell } from "@/model/Cell";
interface GridProps {
  grid: ICell[][];
  onCellClick: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
