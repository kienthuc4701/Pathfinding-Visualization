import Dijkstra from "@/algorithms/pathfinder/Dijkstra";
import { IPathFinder } from "@/algorithms/pathfinder/PathfinderStrategy";
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

// Get point A & point B from maze
export const getRandomStartEnd = (grid: ICell[][]) => {
  const emptyCells = grid.flat().filter((cell) => cell.type === CellType.BASIC);
  const start = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  let end;
  do {
    end = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  } while (end === start);

  start.type = CellType.START;
  end.type = CellType.END;

  return { start, end };
};
// generate pathfinder by algorithm
export const generatePathfinder = (alogrithm: string): IPathFinder => {
  switch (alogrithm) {
    default:
      return new Dijkstra();
  }
};
