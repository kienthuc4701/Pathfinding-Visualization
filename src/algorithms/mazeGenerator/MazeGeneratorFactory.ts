import { ICell } from "@/model/Cell";
import RandomMaze from "./RandomMaze";
import BinaryTreeMaze from "./BinaryTreeMaze";
import BasicMaze from "./BasicMaze";
import { MazeAlgorithmType } from "@/model/Algorithm";

export interface IMazeGenerator {
  generate(grid: ICell[][]): ICell[][];
}

export class MazeGeneratorFactory {
  static create(type: MazeAlgorithmType): IMazeGenerator {
    switch (type) {
      case "RANDOM":
        return new RandomMaze();
      case "BINARY_TREE":
        return new BinaryTreeMaze();
      default:
        return new BasicMaze();
    }
  }
}
