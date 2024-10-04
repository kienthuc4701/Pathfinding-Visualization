import { PooitControlProvider } from "./contexts/PointControlContext";
import PathFindingVisualization from "./visualization/PathfindingVisualization";

const App = () => {
  return (
    <PooitControlProvider>
      <PathFindingVisualization />
    </PooitControlProvider>
  );
};
export default App;
