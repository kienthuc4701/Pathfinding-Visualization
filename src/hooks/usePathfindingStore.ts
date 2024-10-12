import { useGridStore } from "../stores/gridStore";
import { useAlgorithmStore } from "../stores/algorithmStore";
import { useVisualizationStore } from "../stores/visualizationStore";
import { useMazeStore } from "@/stores/mazeStore";

export const usePathfindingStore = () => {
  const gridStore = useGridStore();
  const algorithmStore = useAlgorithmStore();
  const visualizationStore = useVisualizationStore();
  const mazeStore = useMazeStore();

  return {
    ...gridStore,
    ...algorithmStore,
    ...visualizationStore,
    ...mazeStore,
  };
};
