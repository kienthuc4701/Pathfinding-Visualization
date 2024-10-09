import { CellType, ICell } from "@/types";
import {
  GRID_COLS,
  GRID_ROWS,
  MAZE_ALGORITHMS,
  PATH_ALGORITHMS,
} from "@/ultis/constants";
import { createContext, useContext, useReducer } from "react";

interface AppState {
  grid: ICell[][];
  startCell: ICell | null;
  endCell: ICell | null;
  pathAlgorithm: string;
  mazeAlgorithm: string;
  isVisualizing: boolean;
}

type AppAction =
  | { type: "SET_GRID"; payload: ICell[][] }
  | {
      type: "UPDATE_CELL";
      payload: { row: number; col: number; cellType: CellType };
    }
  | { type: "SET_PATH_ALGORITHM"; payload: string }
  | { type: "SET_MAZE_ALGORITHM"; payload: string }
  | { type: "SET_IS_VISUALIZING"; payload: boolean }
  | { type: "SET_START_CELL"; payload: ICell }
  | { type: "SET_END_CELL"; payload: ICell }
  | { type: "DRAG_START"; payload: { row: number; col: number } }
  | { type: "DRAG_END"; payload: { row: number; col: number } }
  | { type: "RESET_GRID" }
  | { type: "CLEAR_PATH" };

const initialGrid = (): ICell[][] =>
  Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: GRID_COLS }, (_, col) => ({
      row,
      col,
      type: CellType.BASIC,
    }))
  );

const initialState: AppState = {
  grid: initialGrid(),
  startCell: { row: 8, col: 4, type: CellType.START },
  endCell: { row: 5, col: 10, type: CellType.END },
  pathAlgorithm: PATH_ALGORITHMS.DIJKSTRA,
  mazeAlgorithm: MAZE_ALGORITHMS.BASIC,
  isVisualizing: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_GRID":
      return { ...state, grid: action.payload };
    case "UPDATE_CELL":
      return {
        ...state,
        grid: state.grid.map((row, rowIndex) =>
          rowIndex === action.payload.row
            ? row.map((cell, colIndex) =>
                colIndex === action.payload.col
                  ? { ...cell, type: action.payload.cellType }
                  : cell
              )
            : row
        ),
      };
    case "SET_START_CELL":
      return { ...state, startCell: action.payload };
    case "SET_END_CELL":
      return { ...state, endCell: action.payload };
    case "SET_PATH_ALGORITHM":
      return { ...state, pathAlgorithm: action.payload };
    case "SET_MAZE_ALGORITHM":
      return { ...state, mazeAlgorithm: action.payload };
    case "SET_IS_VISUALIZING":
      return { ...state, isVisualizing: action.payload };
    case "RESET_GRID":
      return {
        ...state,
        grid: initialGrid(),
        startCell: state.startCell,
        endCell: state.endCell,
      };
    case "CLEAR_PATH":
      return {
        ...state,
        grid: state.grid.map((row) =>
          row.map((cell) =>
            cell.type === CellType.PATH || cell.type === CellType.VISITED
              ? { ...cell, type: CellType.BASIC }
              : cell
          )
        ),
      };
    case "SET_START_CELL":
      return { ...state, startCell: action.payload };
    case "SET_END_CELL":
      return { ...state, endCell: action.payload };
    case "DRAG_START":
      if (
        state.endCell &&
        state.endCell.row === action.payload.row &&
        state.endCell.col === action.payload.col
      ) {
        return state; // Do nothing if trying to drag start to end cell
      }
      if (
        state.endCell &&
        state.endCell.row === action.payload.row &&
        state.endCell.col === action.payload.col
      ) {
        return state; // Do nothing if trying to drag start to end cell
      }
      return {
        ...state,
        grid: state.grid.map((row) =>
          row.map((cell) =>
            cell.row === state.startCell?.row &&
            cell.col === state.startCell?.col
              ? { ...cell, type: CellType.BASIC }
              : cell.row === action.payload.row &&
                cell.col === action.payload.col
              ? { ...cell, type: CellType.START }
              : cell
          )
        ),
        startCell: { ...action.payload, type: CellType.START },
      };
    case "DRAG_END":
      // Check if the target cell is the current end cell (dragged onto itself)
      if (
        state.endCell &&
        state.endCell.row === action.payload.row &&
        state.endCell.col === action.payload.col
      ) {
        return state; // Do nothing if dragged onto itself
      }
      // Check if the target cell is the start cell
      if (
        state.startCell &&
        state.startCell.row === action.payload.row &&
        state.startCell.col === action.payload.col
      ) {
        return state; // Do nothing if trying to drag end to start cell
      }
      return {
        ...state,
        grid: state.grid.map((row) =>
          row.map((cell) =>
            cell.row === state.endCell?.row && cell.col === state.endCell?.col
              ? { ...cell, type: CellType.BASIC }
              : cell.row === action.payload.row &&
                cell.col === action.payload.col
              ? { ...cell, type: CellType.END }
              : cell
          )
        ),
        endCell: { ...action.payload, type: CellType.END },
      };
    default:
      return state;
  }
};
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
