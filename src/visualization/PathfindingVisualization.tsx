import { MazeGeneratorFactory } from "@/algorithms/mazeGenerator/MazeGeneratorFactory";
import { generatePathfinder, getRandomStartEnd } from "@/helpers";
import { useState, useCallback, useEffect } from "react";
import ControlPanel from "@/components/controls/ControlPanel";
import Grid from "@/components/grid/Grid";
import { useGrid } from "@/hooks/useGrid";

export default function PathFindingVisualization() {
  const {
    grid,
    setGrid,
    setStartCell,
    setEndCell,
    initializeGrid,
  } = useGrid();

  const [mazeAlgorithm, setMazeAlgorithm] = useState<string>("BASIC");
  const [pathAlgorithm, setPathAlgorithm] = useState<string>("DIJKSTRA");

  // maze
  const generateNewMaze = useCallback(
    (algorithm: string) => {
      const mazeGenerator = MazeGeneratorFactory.create(algorithm);
      const newGrid = mazeGenerator.generate(initializeGrid());
      setGrid(newGrid);
      const { start, end } = getRandomStartEnd(newGrid);
      setStartCell(start);
      setEndCell(end);
    },
    [mazeAlgorithm, pathAlgorithm]
  );

  useEffect(() => {
    generateNewMaze(mazeAlgorithm);
  }, [mazeAlgorithm]);

  // path
  useEffect(() => {
    generatePathfinder(pathAlgorithm);
  }, [pathAlgorithm]);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
      <ControlPanel
        mazeAlgorithm={mazeAlgorithm}
        setMazeAlgorithm={setMazeAlgorithm}
        pathAlgorithm={pathAlgorithm}
        setPathAlgorithm={setPathAlgorithm}
      />
      <Grid grid={grid} />
    </div>
  );
}
