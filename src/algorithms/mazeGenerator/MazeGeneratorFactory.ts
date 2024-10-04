import { ICell } from "@/model/Cell";
import RandomMaze from "./RandomMaze";
import BinaryTreeMaze from "./BinaryTreeMaze";
import BasicMaze from "./BasicMaze";

export interface IMazeGenerator {
  generate(grid: ICell[][]): ICell[][];
}

export class MazeGeneratorFactory {
  static create(type: string): IMazeGenerator {
    switch (type) {
      case "random":
        return new RandomMaze();
      case "binaryTree":
        return new BinaryTreeMaze();
      default:
        return new BasicMaze();
    }
  }
}
