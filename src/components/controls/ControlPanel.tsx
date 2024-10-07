import React from "react";
import AlgorithmSelector from "./AlgorithmsSelector";
import { MAZE, PATH } from "@/constants";
import {
  PathFinderStrategy,
} from "@/algorithms/pathfinder/PathfinderStrategy";

import { generatePathfinder } from "@/helpers";
import { useGrid } from "@/hooks/useGrid";
import { CellType } from "@/model/Cell";

interface ControlPanelProps {
  mazeAlgorithm: string;
  setMazeAlgorithm: (value: string) => void;
  pathAlgorithm: string;
  setPathAlgorithm: (value: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mazeAlgorithm,
  setMazeAlgorithm,
  pathAlgorithm,
  setPathAlgorithm,
}) => {
  const { grid, setGrid, startCell, endCell, updateCell } = useGrid();

  const visualization = async() => {
    const pathfinder = new PathFinderStrategy(
      generatePathfinder(pathAlgorithm)
    );

    const path = pathfinder.findPath(grid, startCell!, endCell!);


  // Visualize the path
    for (const cell of path) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        updateCell(cell.row, cell.col, CellType.PATH);
      }
    }
  };
  return (
    <div className="mb-4 flex space-x-4 items-center">
      <AlgorithmSelector
        label="Maze Algorithm:"
        value={mazeAlgorithm as string}
        onChange={setMazeAlgorithm}
        options={MAZE.options}
      />
      <AlgorithmSelector
        label="Path Algorithm:"
        value={pathAlgorithm}
        onChange={setPathAlgorithm}
        options={PATH.options}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={visualization}>
        Start Visualization
      </button>
    </div>
  );
};

export default ControlPanel;
