import { ICell, IPathFinder } from "@/types";


export class BFS implements IPathFinder {
  findPath(
    grid: ICell[][],
    start: ICell,
    end: ICell
  ): { path: ICell[]; visitedOrder: ICell[] } {
    const visitedOrder: ICell[] = []; // Implementation for BFS algorithm
    console.log(grid,start,end);
    
    return { path: [], visitedOrder };
  }
}
