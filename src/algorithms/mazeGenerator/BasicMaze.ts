import { CellType, ICell } from '@/model/Cell';
import { IMazeGenerator } from './MazeGeneratorFactory';

export default class BasicMaze implements IMazeGenerator {
  generate(grid: ICell[][]): ICell[][] {
    const newGrid = [...grid];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const cell = grid[rowIndex][colIndex];
        cell.type = CellType.BASIC;
      });
    });
    return newGrid;
  }
}