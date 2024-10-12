import React, { useCallback, useMemo } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { usePathfinding } from "@/hooks/usePathfindingStore";
import { ICell, CellType } from "@/types";

interface CellProps {
  cell: ICell;
}

const Cell: React.FC<CellProps> = React.memo(({ cell }) => {
  const { state, dispatch } = useAppContext();
  const { calculatePath } = usePathfinding();

  const getCellClassName = useMemo(() => {
    const baseClass = "w-6 h-6 border transition-colors duration-300";
    switch (cell.type) {
      case CellType.WALL:
        return `${baseClass} bg-gray-800`;
      case CellType.START:
        return `${baseClass} bg-green-500 cursor-move`;
      case CellType.END:
        return `${baseClass} bg-red-500 cursor-move`;
      case CellType.PATH:
        return `${baseClass} bg-yellow-400`;
      case CellType.VISITED:
        return `${baseClass} bg-blue-200`;
      default:
        return `${baseClass} bg-white cursor-pointer`;
    }
  }, [cell.type]);

  const handleClick = useCallback(() => {
    if (cell.type !== CellType.START && cell.type !== CellType.END) {
      const newType =
        cell.type === CellType.WALL ? CellType.BASIC : CellType.WALL;
      dispatch({
        type: "UPDATE_CELL",
        payload: { row: cell.row, col: cell.col, cellType: newType },
      });
      calculatePath();
    }
  }, [cell, dispatch, calculatePath]);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData("text/plain", `${cell.row},${cell.col}`);
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
        .getData("text")
        .split(",")
        .map(Number);
      const startCell = state.grid[startRow][startCol];

      if (startCell.type === CellType.START) {
        dispatch({
          type: "SET_START_CELL",
          payload: { ...cell, type: CellType.START },
        });
        dispatch({
          type: "UPDATE_CELL",
          payload: { row: cell.row, col: cell.col, cellType: CellType.START },
        });
        dispatch({
          type: "UPDATE_CELL",
          payload: { row: startRow, col: startCol, cellType: CellType.BASIC },
        });
      } else if (startCell.type === CellType.END) {
        dispatch({
          type: "SET_END_CELL",
          payload: { ...cell, type: CellType.END },
        });
        dispatch({
          type: "UPDATE_CELL",
          payload: { row: cell.row, col: cell.col, cellType: CellType.END },
        });
        dispatch({
          type: "UPDATE_CELL",
          payload: { row: startRow, col: startCol, cellType: CellType.BASIC },
        });
      }
      calculatePath();
    },
    [cell, state.grid, dispatch, calculatePath]
  );

  return (
    <div
      className={getCellClassName}
      onClick={handleClick}
      draggable={cell.type === CellType.START || cell.type === CellType.END}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
});

export default Cell;
