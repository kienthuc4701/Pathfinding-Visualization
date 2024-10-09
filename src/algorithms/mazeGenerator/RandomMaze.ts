import { ICell, IMazeGenerator, CellType } from "@/types";

export class RandomizedMaze implements IMazeGenerator {
  generate(grid: ICell[][]): ICell[][] {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, type: CellType.BASIC }))
    );

    const wallProbability = 0.3; // Adjust this value to change the density of walls

    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        if (Math.random() < wallProbability) {
          newGrid[row][col].type = CellType.WALL;
        }
      }
    }
    return newGrid;
  }
}
