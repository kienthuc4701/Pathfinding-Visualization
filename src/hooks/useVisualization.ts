import { useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { CellType } from "@/types";
import { pathfinders } from "@/algorithms/pathfinders";
import { VISUALIZATION_DELAY } from "@/ultis/constants";
import { mazeGenerators } from "@/algorithms/mazeGenerator";

export const useVisualization = () => {
  const { state, dispatch } = useAppContext();

  const updateCell = useCallback(
    (row: number, col: number, cellType: CellType) => {
      dispatch({ type: "UPDATE_CELL", payload: { row, col, cellType } });
    },
    [dispatch]
  );

  const visualizePath = useCallback(async () => {
    if (!state.startCell || !state.endCell || state.isVisualizing) return;
    dispatch({ type: "SET_IS_VISUALIZING", payload: true });
    dispatch({ type: "CLEAR_PATH" });

    const pathfinder = pathfinders[state.pathAlgorithm];
    if (!pathfinder) {
      console.error(`Pathfinder algorithm '${state.pathAlgorithm}' not found`);
      dispatch({ type: "SET_IS_VISUALIZING", payload: false });
      return;
    }

    const { path, visitedOrder } = pathfinder.findPath(
      state.grid,
      state.startCell,
      state.endCell
    );

    for (const cell of visitedOrder) {
      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        updateCell(cell.row, cell.col, CellType.VISITED);
        await new Promise((resolve) =>
          setTimeout(resolve, VISUALIZATION_DELAY)
        );
      }
    }

    for (const cell of path) {
      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        updateCell(cell.row, cell.col, CellType.PATH);
        await new Promise((resolve) =>
          setTimeout(resolve, VISUALIZATION_DELAY)
        );
      }
    }

    dispatch({ type: "SET_IS_VISUALIZING", payload: false });
  }, [
    state.startCell,
    state.endCell,
    state.isVisualizing,
    state.grid,
    state.pathAlgorithm,
    dispatch,
    updateCell,
  ]);

  const generateMaze = useCallback(() => {
    dispatch({ type: "RESET_GRID" });
    const mazeGenerator = mazeGenerators[state.mazeAlgorithm];
    if (!mazeGenerator) {
      console.error(
        `Maze generator algorithm '${state.mazeAlgorithm}' not found`
      );
      return;
    }
    const newGrid = mazeGenerator.generate(state.grid);
    dispatch({ type: "SET_GRID", payload: newGrid });

    // Update start and end cells
    const startCell = newGrid[0][0];
    const endCell = newGrid[newGrid.length - 1][newGrid[0].length - 1];
    dispatch({ type: "SET_START_CELL", payload: startCell });
    dispatch({ type: "SET_END_CELL", payload: endCell });
  }, [state.mazeAlgorithm, state.grid, dispatch]);

  return { visualizePath, generateMaze, updateCell };
};
