import { AlgorithmType, ICell } from "@/types";

const getNeighbors = (grid: ICell[][], cell: ICell): ICell[] => {
  const neighbors: ICell[] = [];
  const { row, col } = cell;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => neighbor.type !== "WALL");
};

const manhattanDistance = (a: ICell, b: ICell): number => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

export const getPathfinding = (
  algorithm: AlgorithmType,
  grid: ICell[][],
  star: ICell,
  end: ICell
) => {
  switch (algorithm) {
    case "DIJKSTRA":
      return dijkstra(grid, star, end);
    case "BFS":
      return bfs(grid, star, end);
    case "DFS":
      return dfs(grid, star, end);
    default:
      return dijkstra(grid, star, end);
  }
};

export const dijkstra = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): { path: ICell[]; visitedCells: ICell[] } => {
  const queue = [start];
  const visitedCells: ICell[] = [];
  const distances = new Map<ICell, number>();
  const previous = new Map<ICell, ICell | null>();

  distances.set(start, 0);
  previous.set(start, null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCells.push(current);

    if (current === end) break;

    for (const neighbor of getNeighbors(grid, current)) {
      const distance = (distances.get(current) || 0) + 1;
      if (!distances.has(neighbor) || distance < distances.get(neighbor)!) {
        distances.set(neighbor, distance);
        previous.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  const path: ICell[] = [];
  let current: ICell | null = end;
  while (current) {
    path.unshift(current);
    current = previous.get(current) || null;
  }

  return { path, visitedCells };
};

export const aStar = (grid: ICell[][], start: ICell, end: ICell): ICell[] => {
  const openSet = [start];
  const closedSet = new Set<ICell>();
  const gScore = new Map<ICell, number>();
  const fScore = new Map<ICell, number>();
  const previous = new Map<ICell, ICell | null>();

  gScore.set(start, 0);
  fScore.set(start, manhattanDistance(start, end));

  while (openSet.length > 0) {
    const current = openSet.reduce((a, b) =>
      fScore.get(a)! < fScore.get(b)! ? a : b
    );

    if (current === end) {
      const path: ICell[] = [];
      let temp: ICell | null = end;
      while (temp) {
        path.unshift(temp);
        temp = previous.get(temp) || null;
      }
      return path;
    }

    openSet.splice(openSet.indexOf(current), 1);
    closedSet.add(current);

    for (const neighbor of getNeighbors(grid, current)) {
      if (closedSet.has(neighbor)) continue;

      const tentativeGScore = gScore.get(current)! + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= gScore.get(neighbor)!) {
        continue;
      }

      previous.set(neighbor, current);
      gScore.set(neighbor, tentativeGScore);
      fScore.set(
        neighbor,
        gScore.get(neighbor)! + manhattanDistance(neighbor, end)
      );
    }
  }

  return []; // No path found
};

export const bfs = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): { path: ICell[]; visitedCells: ICell[] } => {
  const queue = [start];
  const visitedCells: ICell[] = [];
  const previous = new Map<ICell, ICell | null>();

  previous.set(start, null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCells.push(current);

    if (current === end) break;

    for (const neighbor of getNeighbors(grid, current)) {
      if (!visitedCells.includes(neighbor)) {
        visitedCells.push(neighbor);
        previous.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  const path: ICell[] = [];
  let current: ICell | null = end;
  while (current) {
    path.unshift(current);
    current = previous.get(current) || null;
  }

  return { path, visitedCells };
};

export const dfs = (
  grid: ICell[][],
  start: ICell,
  end: ICell
): { path: ICell[]; visitedCells: ICell[] } => {
  const stack = [start];
  const visitedCells: ICell[] = [];
  const previous = new Map<ICell, ICell | null>();

  visitedCells.unshift(start);

  previous.set(start, null);

  while (stack.length > 0) {
    const current = stack.shift()!;
    if (current === end) break;

    for (const neighbor of getNeighbors(grid, current)) {
      if (!visitedCells.includes(neighbor)) {
        visitedCells.push(neighbor);
        previous.set(neighbor, current);
        stack.unshift(neighbor);
      }
    }
  }

  const path: ICell[] = [];
  let current: ICell | null = end;
  while (current) {
    path.unshift(current);
    current = previous.get(current) || null;
  }

  return { path, visitedCells };
};
