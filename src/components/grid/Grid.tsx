import React, { Fragment, useCallback, useMemo } from "react";
import { usePathfindingStore } from "@/hooks/usePathfindingStore";
import {  ICell } from "@/types";
import { GRID_COLS } from "@/ultis/constants";

const CELL_SIZE = 24; // 24px

const Grid: React.FC = () => {
  const {
    grid,
    setCellType,
    startPoint,
    endPoint,
    setStartPoint,
    setEndPoint,
    isVisualizing,
  } = usePathfindingStore();


  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isVisualizing) return;
      if (row === startPoint.row && col === startPoint.col) return;
      if (row === endPoint.row && col === endPoint.col) return;

      const currentType = grid[row][col].type;
      const newType = currentType === "WALL" ? "EMPTY" : "WALL";
      setCellType(row, col, newType);
    },
    [isVisualizing, startPoint, endPoint, grid, setCellType]
  );

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, cell: ICell) => {
      event.dataTransfer.setData("text/plain", JSON.stringify(cell));
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, row: number, col: number) => {
      if (isVisualizing) return;
      event.preventDefault();
      const cell = JSON.parse(event.dataTransfer.getData("text/plain")) as ICell;
      if (cell.type === "START") {
        setStartPoint({ row, col, type: "START" });
        setCellType(row, col, 'START');
        
      } else if (cell.type === "END") {
        setEndPoint({ row, col, type: "END" });
        setCellType(row, col, 'END');
      }
      setCellType(cell.row, cell.col, 'EMPTY');
    },
    [isVisualizing, setStartPoint, setEndPoint]
  );

  const gridStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
      padding: "1px",
      backgroundColor: "rgba(209, 213, 219, 0.1)", // Tailwind's gray-300 with 50% opacity
    }),
    [grid]
  );

  const getCellClassName = useCallback((cell: ICell) => {
    if (cell.type === "WALL") return "bg-[#212529]";
    if (cell.type === "START") return "bg-[#c13b63]";
    if (cell.type === "END") return "bg-[#eb7f03]";
    if (cell.type === "PATH") return "bg-[#897c80] animate-pulse";
    if (cell.type === "VISITED") return "bg-[#839788]";
    return "bg-white";
  }, []);

  return (
    <Fragment>
      <div style={gridStyle}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${getCellClassName(cell)} border border-gray-300`}
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
              draggable={cell.type === "START" || cell.type === "END"}
              onDragStart={(e) => handleDragStart(e, cell)}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(Grid);
