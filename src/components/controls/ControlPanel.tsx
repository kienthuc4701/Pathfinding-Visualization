import React, { useCallback,useState } from "react";
import AlgorithmSelector from "./AlgorithmsSelector";
import { MAZE, PATH } from "@/constants";
import { PathFinderStrategy } from "@/algorithms/pathfinder/PathfinderStrategy";
import { generatePathfinder } from "@/helpers";
import { CellType } from "@/model/Cell";
import { useMaze } from "@/hooks/useMaze";

interface ControlPanelProps {
  mazeAlgorithm: string;
  setMazeAlgorithm: (value: string) => void;
  pathAlgorithm: string;
  setPathAlgorithm: (value: string) => void;
}
const VISUALIZATION_DELAY = 200; // milliseconds
const ControlPanel: React.FC<ControlPanelProps> = ({
  mazeAlgorithm,
  setMazeAlgorithm,
  pathAlgorithm,
  setPathAlgorithm,
}) => {
  const { grid, startCell, endCell, updateCell } = useMaze();
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [error, _] = useState<string | null>(null);

  const visualizePath = useCallback(async () => {
    if (!startCell || !endCell || isVisualizing) return;
    const pathfinder = new PathFinderStrategy(
      generatePathfinder(pathAlgorithm)
    );
    const { path, visitedOrder } = pathfinder.findPath(
      grid,
      startCell,
      endCell
    );
    // Visualize visited cells
    for (const cell of visitedOrder) {
      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        updateCell(cell.row, cell.col, CellType.VISITED);
        await new Promise((resolve) =>
          setTimeout(resolve, VISUALIZATION_DELAY)
        );
      }
    }
    // Visualize the path
    for (const cell of path) {
      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        updateCell(cell.row, cell.col, CellType.PATH);
        await new Promise((resolve) =>
          setTimeout(resolve, VISUALIZATION_DELAY)
        );
      }
    }
    setIsVisualizing(false);
  }, [grid, startCell, endCell, pathAlgorithm, , updateCell]);


  return (
    <div className="mb-4 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <AlgorithmSelector
          label="Maze Algorithm:"
          value={mazeAlgorithm}
          onChange={setMazeAlgorithm}
          options={MAZE.options}
        />
        <AlgorithmSelector
          label="Path Algorithm:"
          value={pathAlgorithm}
          onChange={setPathAlgorithm}
          options={PATH.options}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={visualizePath}
        >
          {isVisualizing ? "Visualizing..." : "Start Visualization"}
        </button>
      </div>
      {error && (
        <div
          className="text-red-500 bg-red-100 border border-red-400 rounded p-2"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
