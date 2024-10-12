export type  CellType =  'EMPTY' | 'WALL' |  'START' | 'END' |'VISITED' |'PATH'

export type AlgorithmType = 'DIJKSTRA' | 'A*' | 'BFS' | 'DFS'

export type MazeType = 'NORMAL' | 'RANDOMIZED' |'BINARY_TREE' | 'RECURSIVE_DIVISION'

export interface ICell {
  row: number;
  col: number;
  type: CellType;
}

export interface IGridState {
  grid: ICell[][];
  startCell: ICell | null;
  endCell: ICell | null;
}

export interface IAlgorithmState {
  pathAlgorithm: string;
  mazeAlgorithm: string;
  speed: number;
}

export interface IVisualizationState {
  isVisualizing: boolean;
  isVisualized: boolean;
  visitedCells: ICell[];
  pathCells: ICell[];
}

export type AppState = IGridState & IAlgorithmState & IVisualizationState;

export type AppAction =
  | { type: 'SET_GRID'; payload: ICell[][] }
  | { type: 'UPDATE_CELL'; payload: { row: number; col: number; cellType: CellType } }
  | { type: 'SET_START_CELL'; payload: ICell }
  | { type: 'SET_END_CELL'; payload: ICell }
  | { type: 'SET_PATH_ALGORITHM'; payload: string }
  | { type: 'SET_MAZE_ALGORITHM'; payload: string }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'SET_IS_VISUALIZING'; payload: boolean }
  | { type: 'SET_IS_VISUALIZED'; payload: boolean }
  | { type: 'RESET_GRID' }
  | { type: 'CLEAR_PATH' }
  | { type: 'UPDATE_VISUALIZATION'; payload: { visitedCells: ICell[]; pathCells: ICell[] } };

export interface IPathFinder {
  findPath(grid: ICell[][], start: ICell, end: ICell): { path: ICell[]; visitedOrder: ICell[] };
}

export interface IMazeGenerator {
  generate(grid: ICell[][]): ICell[][];
}