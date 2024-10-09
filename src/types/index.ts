export enum CellType {
  BASIC = "BASIC",
  WALL = "WALL",
  START = "START",
  END = "END",
  PATH = "PATH",
  VISITED = "VISITED",
}

export interface ICell {
  row: number;
  col: number;
  type: CellType;
}

export interface IPathFinder {
  findPath(
    grid: ICell[][],
    start: ICell,
    end: ICell
  ): { path: ICell[]; visitedOrder: ICell[] };
}

export interface IMazeGenerator {
  generate(grid: ICell[][]): ICell[][];
}
