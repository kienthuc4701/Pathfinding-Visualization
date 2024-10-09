import { CellType, ICell, IMazeGenerator } from "@/types";

export default class BasicMaze implements IMazeGenerator {
  generate(grid: ICell[][]): ICell[][] {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, type: CellType.BASIC }))
    );

    // Set start cell (top-left corner)
    newGrid[0][0].type = CellType.START;

    // Set end cell (bottom-right corner)
    newGrid[newGrid.length - 1][newGrid[0].length - 1].type = CellType.END;

    return newGrid;
  }
}
