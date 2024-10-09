import PathFindingVisualization from "./components/PathfindingVisualization";
import { AppProvider } from "./contexts/AppContext";

const App = () => {
  return (
    <AppProvider>
      <PathFindingVisualization />
    </AppProvider>
  );
};
export default App;
