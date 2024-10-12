import { create } from "zustand";
import { useGridStore } from "./gridStore";
import { useAlgorithmStore } from "./algorithmStore";
import { getPathfinding } from "@/algorithms/algorithm";
interface VisualizationState {
  isVisualizing: boolean;
  error: string | null;
  setIsVisualizing: (isVisualizing: boolean) => void;
  setError: (error: string | null) => void;
  visualizePathfinding: () => Promise<void>;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  isVisualizing: false,
  error: null,
  setIsVisualizing: (isVisualizing) => set({ isVisualizing }),
  setError: (error) => set({ error }),

  visualizePathfinding: async () => {
    const { grid, startPoint, endPoint, setCellType } = useGridStore.getState();
    const { selectedAlgorithm } = useAlgorithmStore.getState();
    set({ isVisualizing: true, error: null });

    try {
      const start = grid[startPoint.row][startPoint.col];
      const end = grid[endPoint.row][endPoint.col];

      if (start.type === "WALL" || end.type === "WALL") {
        throw new Error("Start or end point is a wall");
      }

      const { path, visitedCells } = getPathfinding(
        selectedAlgorithm,
        grid,
        start,
        end
      );

      console.log(path, visitedCells);

      // Visualize visited cells
      for (let i = 0; i < visitedCells.length; i++) {
        const cell = visitedCells[i];
        if (cell !== start && cell !== end) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          setCellType(cell.row, cell.col, "VISITED");
        }
      }

      // Visualize path
      for (let i = 0; i < path.length; i++) {
        const cell = path[i];
        if (cell !== start && cell !== end) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          setCellType(cell.row, cell.col, "PATH");
        }
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "An Anknow error occured",
      });
    } finally {
      set({ isVisualizing: false });
    }
  },
}));
