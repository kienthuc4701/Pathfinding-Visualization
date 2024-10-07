import { ICell } from "@/model/Cell";
import { IPathFinder } from "./PathfinderStrategy";


export default class DFS implements IPathFinder {
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