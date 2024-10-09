import React, { useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ICell, CellType } from "@/types";

interface CellProps {
  cell: ICell;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { dispatch, state } = useAppContext();

  const getCellClassName = () => {
    switch (cell.type) {
      case CellType.WALL:
        return "bg-[#433878]";
      case CellType.START:
        return "bg-[#86D293]";
      case CellType.END:
        return "bg-[#86D293]";
      case CellType.PATH:
        return "bg-[#3A6D8C] animate-pulse";
      case CellType.VISITED:
        return "bg-[#F2E5BF]";
      default:
        return "bg-white";
    }
  };

  const handleClick = useCallback(() => {
    if (cell.type !== CellType.START && cell.type !== CellType.END) {
      const newType =
        cell.type === CellType.WALL ? CellType.BASIC : CellType.WALL;
      dispatch({
        type: "UPDATE_CELL",
        payload: { row: cell.row, col: cell.col, cellType: newType },
      });
    }
  }, [cell, dispatch]);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      // store data of this item
      e.dataTransfer.setData("ID", `${cell.row},${cell.col}`);
    },
    [cell]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const [startRow, startCol] = e.dataTransfer
        .getData("ID")
        .split(",")
        .map(Number);
        
      const startCell = state.grid[startRow][startCol];

      if (startCell.type === CellType.START) {
        dispatch({
          type: "DRAG_START",
          payload: { row: cell.row, col: cell.col },
        });
      } else if (startCell.type === CellType.END) {
        dispatch({
          type: "DRAG_END",
          payload: { row: cell.row, col: cell.col },
        });
      }
    },
    [state.grid, dispatch, cell]
  );

  return (
    <div
      className={`w-6 h-6 border ${getCellClassName()} ${
        cell.type === CellType.START || cell.type === CellType.END
          ? "cursor-move"
          : "cursor-pointer"
      } transition-colors duration-300`}
      onClick={handleClick}
      draggable={cell.type === CellType.START || cell.type === CellType.END}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};

export default React.memo(Cell);
