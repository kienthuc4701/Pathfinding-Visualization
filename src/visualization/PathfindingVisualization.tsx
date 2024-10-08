import { useCallback, useEffect, useState } from "react";
import ControlPanel from "@/components/controls/ControlPanel";
import Grid from "@/components/grid/Grid";
import { useMaze } from "@/hooks/useMaze";

export default function PathFindingVisualization() {
  const [mazeAlgorithm, setMazeAlgorithm] = useState<string>("BASIC");
  const [pathAlgorithm, setPathAlgorithm] = useState<string>("DIJKSTRA");

  // const handleGenerateMaze = useCallback(() => {
  //   resetGrid();
  //   getRandomStartEnd();
  // }, [resetGrid, getRandomStartEnd]);

  // useEffect(() => {
  //   handleGenerateMaze();
  // }, [mazeAlgorithm]);
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
      {/* <ControlPanel
        mazeAlgorithm={mazeAlgorithm}
        setMazeAlgorithm={setMazeAlgorithm}
        pathAlgorithm={pathAlgorithm}
        setPathAlgorithm={setPathAlgorithm}
      /> */}
      <Grid />
    </div>
  );
}
