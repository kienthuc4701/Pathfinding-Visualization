import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { AppState, AppAction, CellType } from '../types';
import { GRID_COLS, GRID_ROWS, MAZE_ALGORITHMS, PATH_ALGORITHMS, SPEEDS } from '@/ultis/constants';

const initialGrid = (): AppState['grid'] =>
  Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: GRID_COLS }, (_, col) => ({
      row,
      col,
      type: CellType.BASIC,
    }))
  );

const initialState: AppState = {
  grid: initialGrid(),
  startCell: null,
  endCell: null,
  pathAlgorithm: PATH_ALGORITHMS.DIJKSTRA,
  mazeAlgorithm: MAZE_ALGORITHMS.BASIC,
  speed: SPEEDS.NORMAL,
  isVisualizing: false,
  isVisualized: false,
  visitedCells: [],
  pathCells: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_GRID':
      return { ...state, grid: action.payload };
    case 'UPDATE_CELL':
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
    case 'SET_START_CELL':
      return { ...state, startCell: action.payload };
    case 'SET_END_CELL':
      return { ...state, endCell: action.payload };
    case 'SET_PATH_ALGORITHM':
      return { ...state, pathAlgorithm: action.payload, isVisualized: false };
    case 'SET_MAZE_ALGORITHM':
      return { ...state, mazeAlgorithm: action.payload, isVisualized: false };
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'SET_IS_VISUALIZING':
      return { ...state, isVisualizing: action.payload };
    case 'SET_IS_VISUALIZED':
      return { ...state, isVisualized: action.payload };
    case 'RESET_GRID':
      return { ...initialState, grid: initialGrid() };
    case 'CLEAR_PATH':
      return {
        ...state,
        grid: state.grid.map((row) =>
          row.map((cell) =>
            cell.type === CellType.PATH || cell.type === CellType.VISITED
              ? { ...cell, type: CellType.BASIC }
              : cell
          )
        ),
        visitedCells: [],
        pathCells: [],
        isVisualized: false,
      };
    case 'UPDATE_VISUALIZATION':
      return {
        ...state,
        visitedCells: action.payload.visitedCells,
        pathCells: action.payload.pathCells,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const memoizedDispatch = useCallback(dispatch, []);

  return <AppContext.Provider value={{ state, dispatch: memoizedDispatch }}>{children}</AppContext.Provider>
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};