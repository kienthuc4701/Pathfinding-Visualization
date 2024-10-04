import { ICell } from './Cell';

export interface IGridObserver {
  update(grid: ICell[][]): void;
}

export class GridSubject {
  private observers: IGridObserver[] = [];
  private grid: ICell[][];

  constructor(grid: ICell[][]) {
    this.grid = grid;
  }

  attach(observer: IGridObserver) {
    this.observers.push(observer);
  }

  detach(observer: IGridObserver) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    for (const observer of this.observers) {
      observer.update(this.grid);
    }
  }

  setGrid(grid: ICell[][]) {
    this.grid = grid;
    this.notify();
  }

  getGrid(): ICell[][] {
    return this.grid;
  }
}