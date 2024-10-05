import { CellType, ICell } from "@/model/Cell";
import { IMazeGenerator } from "./MazeGeneratorFactory";
import { THRESH_HOLD_WALL } from "@/constants";


export default class RandomMaze implements IMazeGenerator {
  generate(grid: ICell[][]): ICell[][] {
    const newGrid = [...grid];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const cell = grid[rowIndex][colIndex];
        cell.type = Math.random() < THRESH_HOLD_WALL ? CellType.WALL : CellType.BASIC;
      });
    });
    return newGrid;
  }
}
