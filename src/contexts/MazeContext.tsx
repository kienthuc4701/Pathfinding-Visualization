import { MAZE } from "@/constants";
import { CellType, ICell } from "@/model/Cell";
import { createContext, useCallback, useReducer } from "react";

interface MazeState {
  grid: ICell[][];
  startCell: ICell | null;
  endCell: ICell | null;
}

type MazeAction =
  | { type: "SET_GRID"; payload: ICell[][] }
  | {
      type: "UPDATE_CELL";
      payload: { row: number; col: number; newType: CellType };
    }
  | { type: "RESET_GRID" }
  | { type: "CLEAR_PATH" }
  | { type: "SET_START_END"; payload: { start: ICell; end: ICell } };

interface MazeContextType extends MazeState {
  updateCell: (row: number, col: number, newType: CellType) => void;
  resetGrid: () => void;
  clearPath: () => void;
}

export const MazeContext = createContext<MazeContextType | null>(null);

const initializeGrid = (): ICell[][] => {
  const grid:ICell[][] = Array.from({ length: MAZE.rows }, (_, row) =>
    Array.from({ length: MAZE.cols }, (_, col) => ({
      row,
      col,
      type: CellType.BASIC,
    }))
  );
  const startCell = getRandomEmptyCell(grid);
  const endCell = getRandomEmptyCell(grid);

  updateCellType(grid, startCell, CellType.START);
  updateCellType(grid, endCell, CellType.END);

  return  grid;
};
const updateCellType = (grid: ICell[][], cell:ICell, type:CellType) => {
   const {row, col} = cell;
   grid[row][col].type = type;
}
const getRandomEmptyCell = (grid: ICell[][]) => {
  const emptyCells = grid.flat().filter((cell) => cell.type === CellType.BASIC);
  const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return cell;
};
const initialState: MazeState = {
  grid: initializeGrid(),
  startCell: null,
  endCell: null,
};

const mazeReducer = (state: MazeState, action: MazeAction): MazeState => {
  switch (action.type) {
    case "SET_GRID":
      return { ...state, grid: action.payload };
    case "UPDATE_CELL":
      const { row, col, newType } = action.payload;
      const newGrid = [...state.grid];
      const cell = newGrid[row][col];
      updateCellType(newGrid, cell, newType);
      return { ...state, grid: newGrid };
    case "RESET_GRID":
      return { ...initialState, grid: initializeGrid() };
    case "CLEAR_PATH":
      const clearedGrid = state.grid.map((row) =>
        row.map((cell) =>
          cell.type === CellType.PATH || cell.type === CellType.VISITED
            ? { ...cell, type: CellType.BASIC }
            : cell
        )
      );
      return { ...state, grid: clearedGrid };
    case "SET_START_END":
      return {
        ...state,
        startCell: action.payload.start,
        endCell: action.payload.end,
      };
    default:
      return state;
  }
};

export const MazeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mazeReducer, initialState);

  const updateCell = useCallback(
    (row: number, col: number, newType: CellType) => {
      dispatch({ type: "UPDATE_CELL", payload: { row, col, newType } });
    },
    []
  );

  const resetGrid = useCallback(() => {
    dispatch({ type: "RESET_GRID" });
  }, []);

  const clearPath = useCallback(() => {
    dispatch({ type: "CLEAR_PATH" });
  }, []);

  const value: MazeContextType = {
    ...state,
    updateCell,
    resetGrid,
    clearPath,
  };

  return <MazeContext.Provider value={value}>{children}</MazeContext.Provider>;
};
