import { MazeProvider } from "./contexts/MazeContext";
import PathFindingVisualization from "./visualization/PathfindingVisualization";

const App = () => {
  return (
    <MazeProvider>
      <PathFindingVisualization />
    </MazeProvider>
  );
};
export default App;
