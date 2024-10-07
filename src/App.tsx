import { GridProvider } from "./contexts/GridContext";
import PathFindingVisualization from "./visualization/PathfindingVisualization";

const App = () => {
  return (
      <GridProvider>
      <PathFindingVisualization />
      </GridProvider>
  );
};
export default App;
