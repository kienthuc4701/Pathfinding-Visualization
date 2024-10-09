import { CellType, ICell, IMazeGenerator } from "@/types";

export default class BasicMaze implements IMazeGenerator {
  generate(grid: ICell[][]): ICell[][] {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, type: CellType.BASIC }))
    );
    return newGrid;
  }
}
