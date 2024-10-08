import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { CellType, ICell } from "@/model/Cell";
import { useGrid } from "@/hooks/useMaze";

interface CellProps {
  cell: ICell;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  const { updateCell } = useGrid();

  const getCellColor = useCallback(() => {
    switch (cell.type) {
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
  }, [cell.type]);

  const handleCellClick = (row: number, col: number) => {
    if (cell.type !== CellType.START && cell.type !== CellType.END) {
      updateCell(
        row,
        col,
        cell.type === CellType.WALL ? CellType.BASIC : CellType.WALL
      );
    }
  };

  return (
    <motion.div
      className={`w-6 h-6 border border-slate-300 ${getCellColor()}`}
      onClick={()=>handleCellClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      draggable={cell.type === CellType.START || cell.type === CellType.END}
    />
  );
};

export default Cell;
