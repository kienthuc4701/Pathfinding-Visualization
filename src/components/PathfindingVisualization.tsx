import React, { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useVisualization } from "@/hooks/useVisualization";
import ControlPanel from "./controls/ControlPanel";
import Grid from "./grid/Grid";
import { CellType } from "@/types";

const PathFindingVisualization: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { visualizePath, generateMaze } = useVisualization();

  useEffect(() => {
    // Set initial start and end cells
    const startCell = state.grid[1][1];
    const endCell = state.grid[state.grid.length - 2][state.grid[0].length - 2];

    dispatch({
      type: "SET_START_CELL",
      payload: { ...startCell, type: CellType.START },
    });
    dispatch({
      type: "SET_END_CELL",
      payload: { ...endCell, type: CellType.END },
    });

    dispatch({
      type: "UPDATE_CELL",
      payload: { row: 1, col: 1, cellType: CellType.START },
    });
    dispatch({
      type: "UPDATE_CELL",
      payload: {
        row: state.grid.length - 2,
        col: state.grid[0].length - 2,
        cellType: CellType.END,
      },
    });
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="mx-auto max-w-screen-md p-4">
        <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
        <ControlPanel
          onVisualize={visualizePath}
          onGenerateMaze={generateMaze}
        />
        <Grid />
      </div>
    </div>
  );
};

export default PathFindingVisualization;
