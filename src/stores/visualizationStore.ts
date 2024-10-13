import { create } from "zustand";
import { useGridStore } from "./gridStore";
import { useAlgorithmStore } from "./algorithmStore";
import { getPathfinding } from "@/algorithms/algorithm";
import { SPEEDS } from "@/ultis/constants";
interface VisualizationState {
  isVisualizing: boolean;
  error: string | null;
  speed: number;
  setIsVisualizing: (isVisualizing: boolean) => void;
  setError: (error: string | null) => void;
  visualizePathfinding: () => Promise<void>;
  setSpeed: (speed: number) => void;
}

export const useVisualizationStore = create<VisualizationState>((set,get) => ({
  isVisualizing: false,
  error: null,
  speed: SPEEDS.NORMAL,
  setIsVisualizing: (isVisualizing) => set({ isVisualizing }),
  setError: (error) => set({ error }),
  setSpeed: (speed) => set({ speed }),
  visualizePathfinding: async () => {
    const {speed} = get();

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
      
      // Visualize visited cells
      for (let i = 0; i < visitedCells.length; i++) {
        const cell = visitedCells[i];
        if (cell !== start && cell !== end) {
          await new Promise((resolve) => setTimeout(resolve, speed));
          setCellType(cell.row, cell.col, "VISITED");
        }
      }

      // Visualize path
      for (let i = 0; i < path.length; i++) {
        const cell = path[i];
        if (cell !== start && cell !== end) {
          await new Promise((resolve) => setTimeout(resolve, speed));
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
