import React, { useEffect } from "react";
import Controls from "./components/controls/Controls";
import Grid from "./components/grid/Grid";
import { useMazeStore } from "./stores/mazeStore";
import { useGridStore } from "./stores/gridStore";

const App: React.FC = () => {
  const { resetGrid } = useGridStore();
  const { generateMaze, selectedMazeAlgorithm } = useMazeStore();

  useEffect(() => {
    resetGrid();
  }, []);

  useEffect(() => {
    generateMaze();
  }, [selectedMazeAlgorithm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Pathfinding Visualizer</h1>
      <Controls />
        <Grid />
    </div>
  );
};

export default App;
