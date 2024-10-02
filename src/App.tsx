import { Grid } from "./components/Grid";
import { PathfinderProvider } from "./contexts/PathfinderContext";

 const App = () => {
  return (
    <PathfinderProvider>
      <Grid />
    </PathfinderProvider>
  );
};
export default App;