import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { CellType, ICell } from "@/model/Cell";

interface CellProps {
  cell: ICell;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
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

  return (
    <motion.div
      className={`w-6 h-6 border border-slate-300 ${getCellColor()}`}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      draggable={cell.type === CellType.START || cell.type === CellType.END}
    />
  );
};

export default Cell;
