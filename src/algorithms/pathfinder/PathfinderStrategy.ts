import { ICell } from "@/model/Cell";

export interface IPathFinder {
  findPath(grid: ICell[][], start: ICell, end: ICell): ICell[];
}

export class PathFinderStrategy {
  private strategy: IPathFinder;

  constructor(strategy: IPathFinder) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IPathFinder) {
    this.strategy = strategy;
  }

  findPath(grid: ICell[][], start: ICell, end: ICell): ICell[] {
    return this.strategy.findPath(grid, start, end);
  }
}