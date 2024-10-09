import { ICell, IPathFinder, CellType } from "@/types";

interface QueueItem {
  cell: ICell;
  priority: number;
}

class PriorityQueue {
  private items: QueueItem[] = [];

  enqueue(cell: ICell, priority: number): void {
    const item: QueueItem = { cell, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (item.priority < this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(item);
    }
  }

  dequeue(): ICell | undefined {
    return this.items.shift()?.cell;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class Dijkstra implements IPathFinder {
  private static readonly DIRECTIONS: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  private getNeighbors(grid: ICell[][], cell: ICell): ICell[] {
    return Dijkstra.DIRECTIONS.reduce<ICell[]>((neighbors, [dx, dy]) => {
      const newRow = cell.row + dx;
      const newCol = cell.col + dy;

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        grid[newRow][newCol].type !== CellType.WALL
      ) {
        neighbors.push(grid[newRow][newCol]);
      }

      return neighbors;
    }, []);
  }

  private reconstructPath(cameFrom: Map<string, ICell>, end: ICell): ICell[] {
    const path: ICell[] = [];
    let current: ICell | undefined = end;

    while (current) {
      path.unshift(current);
      const key = `${current.row},${current.col}`;
      current = cameFrom.get(key);
    }

    return path;
  }

  findPath(
    grid: ICell[][],
    start: ICell,
    end: ICell
  ): { path: ICell[]; visitedOrder: ICell[] } {
    const pq = new PriorityQueue();
    const distances = new Map<string, number>();
    const cameFrom = new Map<string, ICell>();
    const visitedOrder: ICell[] = [];

    pq.enqueue(start, 0);
    distances.set(`${start.row},${start.col}`, 0);

    while (!pq.isEmpty()) {
      const current = pq.dequeue()!;
      visitedOrder.push(current);

      if (current.row === end.row && current.col === end.col) {
        return {
          path: this.reconstructPath(cameFrom, end),
          visitedOrder,
        };
      }

      const neighbors = this.getNeighbors(grid, current);

      for (const neighbor of neighbors) {
        const tentativeDistance =
          distances.get(`${current.row},${current.col}`)! + 1;
        const neighborKey = `${neighbor.row},${neighbor.col}`;

        if (
          !distances.has(neighborKey) ||
          tentativeDistance < distances.get(neighborKey)!
        ) {
          distances.set(neighborKey, tentativeDistance);
          cameFrom.set(neighborKey, current);
          pq.enqueue(neighbor, tentativeDistance);
        }
      }
    }

    // If no path is found
    return { path: [], visitedOrder };
  }
}
