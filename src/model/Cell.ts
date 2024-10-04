export type CellType = 'EMPTY' | 'WALL' | 'START' | 'END' | 'PATH' | 'VISITED';

export interface ICell {
  row: number;
  col: number;
  type: CellType;
}

export class Cell implements ICell {
  constructor(public row: number, public col: number, public type: CellType = 'EMPTY') {}
}