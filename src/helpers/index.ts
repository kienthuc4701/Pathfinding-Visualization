import { MAZE } from "@/constants";
import { Cell, CellType, ICell } from "@/model/Cell";

// Create new empty maze
export const generateEmptyMaze = () => {
  const newGrid: ICell[][] = [];
  for (let row = 0; row < MAZE.rows; row++) {
    const currentRow: ICell[] = [];
    for (let col = 0; col < MAZE.cols; col++) {
      currentRow.push(new Cell(row, col));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

// Get random cell from maze
const getRandomCellByType = (grid: ICell[][], type: CellType = CellType.BASIC) => {
  let row, col;
  do {
    row = Math.floor(Math.random() * MAZE.rows);
    col = Math.floor(Math.random() * MAZE.cols);
  } while (grid[row][col].type !== type);
  return { row, col,type };
};

// Get point A & point B from maze
export const getRandomStartEnd = (grid: ICell[][]) => {
  const newGrid = [...grid];
  const start = getRandomCellByType(newGrid);
  let end;
  do {
    end = getRandomCellByType(newGrid);
  } while (end.row === start.row && end.col === start.col);

  newGrid[start.row][start.col].type = CellType.START;
  newGrid[end.row][end.col].type = CellType.END;

  return {start, end}
};
