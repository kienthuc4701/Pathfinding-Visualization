import { MAZE } from "@/constants";
import { CellType, ICell } from "@/model/Cell";
import { createContext, useCallback, useState } from "react";

interface GridContext {
  grid: ICell[][];
  setGrid: (grid: ICell[][]) => void;
  startCell: ICell | null;
  setStartCell: (cell: ICell) => void;
  endCell: ICell | null;
  setEndCell: (cell: ICell) => void;
  initializeGrid: () => ICell[][];
  updateCell:(row: number, col: number, newType: CellType)=> void;
}

export const GridContext = createContext<GridContext | null>(null);

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [grid, setGrid] = useState<ICell[][]>([]);
  const [startCell, setStartCell] = useState<ICell | null>(null);
  const [endCell, setEndCell] = useState<ICell | null>(null);

  const initializeGrid = useCallback(() => {
    const newGrid: ICell[][] = [];
    for (let row = 0; row < MAZE.rows; row++) {
      const currentRow: ICell[] = [];
      for (let col = 0; col < MAZE.cols; col++) {
        currentRow.push({ row, col, type: CellType.BASIC });
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }, []);

  const updateCell = useCallback((row: number, col: number, newType: CellType) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = { ...newGrid[row][col], type: newType };
      return newGrid;
    });
  }, []);
  

  return (
    <GridContext.Provider
      value={{
        grid,
        setGrid,
        startCell,
        setStartCell,
        endCell,
        setEndCell,
        initializeGrid,
        updateCell
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
