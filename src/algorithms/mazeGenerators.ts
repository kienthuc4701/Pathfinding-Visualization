import { CellType, MazeType } from "../types";

interface MazeGenerator {
  generate(rows: number, cols: number): CellType[][];
}

class NormalMaze implements MazeGenerator {
  generate(rows: number, cols: number): CellType[][] {
    const grid: CellType[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            x: 0,
            y: 0,
            isWall: true,
            isStart: false,
            isEnd: false,
          }))
      );
    return grid;
  }
}

class BinaryTreeMaze implements MazeGenerator {
  generate(rows: number, cols: number): CellType[][] {
    const grid: CellType[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            x: 0,
            y: 0,
            isWall: true,
            isStart: false,
            isEnd: false,
          }))
      );

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r % 2 === 1 || c % 2 === 1) {
          grid[r][c].isWall = false;
        }
        if (r > 0 && c > 0) {
          if (Math.random() < 0.5) {
            grid[r - 1][c].isWall = false;
          } else {
            grid[r][c - 1].isWall = false;
          }
        }
      }
    }

    // Set start and end points
    grid[0][0].isStart = true;
    grid[rows - 1][cols - 1].isEnd = true;

    return grid;
  }
}

// class RecursiveDivisionMaze implements MazeGenerator {
//   generate(rows: number, cols: number): CellType[][] {
//     // Implementation of Recursive Division maze generation
//     // This is a placeholder, you should implement the actual algorithm
//     const grid: CellType[][] = Array(rows)
//       .fill(null)
//       .map(() =>
//         Array(cols)
//           .fill(null)
//           .map(() => ({ isWall: false, isStart: false, isEnd: false }))
//       )

//     // Set start and end points
//     grid[0][0].isStart = true
//     grid[rows - 1][cols - 1].isEnd = true

//     return grid
//   }
// }

export class MazeFactory {
  static createMazeGenerator(type: MazeType): MazeGenerator {
    switch (type) {
      case "BINARY_TREE":
        return new BinaryTreeMaze();
      // case 'RECURSIVE_DIVISON':
      // return new RecursiveDivisionMaze()
      default:
        return new NormalMaze();
    }
  }
}
