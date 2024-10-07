import { GridProvider } from "./contexts/GridContext";
import { PointControlProvider } from "./contexts/PointControlContext";
import PathFindingVisualization from "./visualization/PathfindingVisualization";

const App = () => {
  return (
    <PointControlProvider>
      <GridProvider>
      <PathFindingVisualization />
      </GridProvider>
    </PointControlProvider>
  );
};
export default App;
