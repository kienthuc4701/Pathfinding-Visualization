import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ICell } from '@/model/Cell';

interface CellProps {
  cell: ICell;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
  const getCellColor = useCallback(() => {
    switch (cell.type) {
      case 'WALL':
        return 'bg-gray-800';
      case 'START':
        return 'bg-green-500';
      case 'END':
        return 'bg-red-500';
      case 'PATH':
        return 'bg-yellow-300';
      case 'VISITED':
        return 'bg-blue-200';
      default:
        return 'bg-white';
    }
  },[cell.type]);

  return (
    <motion.div
      className={`w-6 h-6 border border-background ${getCellColor()}`}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    />
  );
};

export default Cell;