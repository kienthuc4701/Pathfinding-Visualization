import { NodeType } from '../types';

export const createInitialGrid = (rows: number, cols: number): NodeType[][] => {
  const grid: NodeType[][] = [];

  for (let row = 0; row < rows; row++) {
    const currentRow: NodeType[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isStart: false,
        isEnd: false,
        isWall: false,
        isVisited: false,
        distance: Infinity,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }

  return grid;
};

export const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number): NodeType[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};