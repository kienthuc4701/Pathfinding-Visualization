import { CellType, ICell, MazeType } from "@/types";
import { GRID_COLS, GRID_ROWS } from "@/ultis/constants";

export const getMaze = (
  maze: MazeType,
  grid: ICell[][],
  start: ICell,
  end: ICell
): ICell[][] => {
  switch (maze) {
    case "NORMAL":
      return normal(start, end);
    case "RANDOMIZED":
      return randomWall(grid, start, end);
    case "BINARY_TREE":
      return binaryTree(grid, start, end);
    case "RECURSIVE_DIVISION":
      return recursiveDivision(grid, start, end);
    default:
      throw new Error(`Unsupported maze type: ${maze}`);
  }
};

const isSpecialCell = (cell: ICell, start: ICell, end: ICell): boolean => {
  return (
    (cell.row === start.row && cell.col === start.col) ||
    (cell.row === end.row && cell.col === end.col)
  );
};

export const normal = (start: ICell, end: ICell) => {
  const newGrid: ICell[][] = Array(GRID_ROWS)
    .fill(null)
    .map((_, row) =>
      Array(GRID_COLS)
        .fill(null)
        .map((_, col) => ({
          row,
          col,
          type:
            row === start.row && col === start.col
              ? "START"
              : row === end.row && col === end.col
              ? "END"
              : "EMPTY",
        }))
    );
  return newGrid;
};

export const randomWall = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): ICell[][] => {
  return grid.map((row) =>
    row.map((cell) =>
      isSpecialCell(cell, start, end)
        ? cell
        : { ...cell, type: Math.random() < 0.3 ? "WALL" : "EMPTY" }
    )
  );
};

export const binaryTree = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): ICell[][] => {
  // Step 1: Initialize new grid with all walls
  const newGrid = [...grid];

  // Step 2: Set all inner cells to WALL, leave the borders intact
  for (let row = 1; row < GRID_ROWS - 1; row++) {
    for (let col = 1; col < GRID_COLS - 1; col++) {
      newGrid[row][col].type = "WALL"; // Start with all walls
    }
  }

  // Step 3: Iterate through the inner grid only
  for (let row = 2; row < GRID_ROWS; row += 2) {
    for (let col = 2; col < GRID_COLS; col += 2) {
      const cell = newGrid[row][col];
      cell.type = "EMPTY"; // Carve the current cell as a path

      const neighbors: ICell[] = [];

      // Collect valid neighbors for carving (only within bounds)
      if (row > 1) {
        neighbors.push(newGrid[row - 2][col]); // North
      }
      if (col > 1) {
        neighbors.push(newGrid[row][col - 2]); // West
      }

      // Randomly select a neighbor to carve a path
      if (neighbors.length > 0) {
        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        const inBetweenRow = (randomNeighbor.row + row) / 2;
        const inBetweenCol = (randomNeighbor.col + col) / 2;

        // Carve the path to the chosen neighbor and the wall between them
        newGrid[inBetweenRow][inBetweenCol].type = "EMPTY";
        randomNeighbor.type = "EMPTY";
      }
    }
  }

  // Ensure start and end are accessible, they should not be walls
  newGrid[start.row][start.col].type = "START";
  newGrid[end.row][end.col].type = "END";

  return newGrid;
};

export const recursiveDivision = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): ICell[][] => {
  const newGrid = grid.map((row) =>
    row.map((cell) => ({ ...cell, type: "EMPTY" as CellType }))
  );

  const divide = (
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: "horizontal" | "vertical"
  ) => {
    if (width < 2 || height < 2) return;

    const horizontal = orientation === "horizontal";

    const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
    const wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);

    const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
    const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

    const dx = horizontal ? 1 : 0;
    const dy = horizontal ? 0 : 1;

    const length = horizontal ? width : height;

    for (let i = 0; i < length; i++) {
      const cellX = wx + i * dx;
      const cellY = wy + i * dy;
      if (
        (cellX !== px || cellY !== py) &&
        !isSpecialCell(newGrid[cellY][cellX], start, end)
      ) {
        newGrid[cellY][cellX].type = "WALL";
      }
    }

    const nx = x;
    const ny = y;
    const w = horizontal ? width : wx - x + 1;
    const h = horizontal ? wy - y + 1 : height;
    divide(nx, ny, w, h, horizontal ? "vertical" : "horizontal");

    const nx2 = horizontal ? x : wx + 1;
    const ny2 = horizontal ? wy + 1 : y;
    const w2 = horizontal ? width : x + width - wx - 1;
    const h2 = horizontal ? y + height - wy - 1 : height;
    divide(nx2, ny2, w2, h2, horizontal ? "vertical" : "horizontal");
  };

  divide(
    0,
    0,
    GRID_COLS,
    GRID_ROWS,
    Math.random() < 0.5 ? "horizontal" : "vertical"
  );
  return newGrid;
};
