import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { MAZE_ALGORITHMS, PATH_ALGORITHMS } from "@/ultis/constants";
import AlgorithmSelector from "./AlgorithmsSelector";
import { CellType } from "@/types";
import { useVisualization } from "@/hooks/useVisualization";

const ControlPanel: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { visualizePath, generateMaze } = useVisualization();

  //Handle the first time access to application
  useEffect(() => {
    dispatch({ type: "RESET_GRID" });
    dispatch({
      type: "UPDATE_CELL",
      payload: { ...state.startCell!, cellType: CellType.START },
    });
    dispatch({
      type: "UPDATE_CELL",
      payload: { ...state.endCell!, cellType: CellType.END },
    });
  }, []);

  return (
    <div className="mb-4 flex space-x-4 items-center">
      <AlgorithmSelector
        label="Maze Algorithm:"
        value={state.mazeAlgorithm}
        options={Object.entries(MAZE_ALGORITHMS).map(([key, value]) => ({
          value,
          label: key,
        }))}
        disabled={state.isVisualizing}
      />
      <AlgorithmSelector
        label="Path Algorithm:"
        value={state.pathAlgorithm}
        options={Object.entries(PATH_ALGORITHMS).map(([key, value]) => ({
          value,
          label: key,
        }))}
        disabled={state.isVisualizing}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={generateMaze}
        disabled={state.isVisualizing}
      >
        Generate Maze
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={visualizePath}
        disabled={state.isVisualizing}
      >
        Visualize Path
      </button>
    </div>
  );
};

export default ControlPanel;
