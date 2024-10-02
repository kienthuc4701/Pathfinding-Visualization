import { MazeFactory } from "@/algorithms/mazeGenerators";
import { MAZE_CONFIG } from "@/constant";
import { AlgorithmType, CellType, MazeType } from "@/types";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

type PathfinderContextType = {
  grid: CellType[][];
  setGrid: (grid: CellType[][]) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  maze: MazeType;
  setMaze: (maze: MazeType) => void;
};

export const PathfinderContext = createContext<PathfinderContextType | undefined>(undefined);

export const PathfinderProvider = ({ children }: { children: ReactNode }) => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("DIJKSTRA");
  const [maze, setMaze] = useState<MazeType>("NORMAL");



  return (
    <PathfinderContext.Provider  value={{ grid, setGrid, algorithm, setAlgorithm, maze, setMaze }}>
      {children}
    </PathfinderContext.Provider>
  );
};
