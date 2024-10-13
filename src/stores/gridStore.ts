import { CellType, ICell } from "@/types";
import { GRID_COLS, GRID_ROWS } from "@/ultis/constants";
import { create } from "zustand";

interface GridState {
  grid: ICell[][];
  gridSize: { rows: number; cols: number };
  startPoint: ICell;
  endPoint: ICell;
  setGrid: (grid: ICell[][]) => void;
  setGridSize: (size: { rows: number; cols: number }) => void;
  setStartPoint: (point: ICell) => void;
  setEndPoint: (point: ICell) => void;
  setCellType: (row: number, col: number, type: CellType) => void;
  resetGrid: () => void;
}

export const useGridStore = create<GridState>((set, get) => ({
  grid: [],
  gridSize: { rows: 20, cols: 30 },
  startPoint: { row: 10, col: 10, type: "START" },
  endPoint: { row: 12, col: 28, type: "END" },

  setGrid: (grid) => set({ grid }),
  setGridSize: (size) => set({ gridSize: size }),
  setStartPoint: (point) => set({ startPoint: point }),
  setEndPoint: (point) => set({ endPoint: point }),

  setCellType: (row, col, type) => {
    const newGrid:ICell[][] = [...get().grid];
    newGrid[row][col].type = type;
    set({ grid: newGrid });
  },

  resetGrid: () => {
    const { startPoint, endPoint } = get();
    const newGrid: ICell[][] = Array(GRID_ROWS)
      .fill(null)
      .map((_, row) =>
        Array(GRID_COLS)
          .fill(null)
          .map((_, col) => ({
            row,
            col,
            type:
              row === startPoint.row && col === startPoint.col
                ? "START"
                : row === endPoint.row && col === endPoint.col
                ? "END"
                : "EMPTY",
          }))
      );
    set({ grid: newGrid });
  },
}));
