import { IMazeGenerator } from "@/types";
import { RandomizedMaze } from "./RandomMaze";
import BasicMaze from "./BasicMaze";

export const mazeGenerators: { [key: string]: IMazeGenerator } = {
  BASIC: new BasicMaze(),
  RANDOMIZED: new RandomizedMaze(),
  // Add other maze generators here as you implement them
  // recursiveDivision: new RecursiveDivisionMazeGenerator(),
};
