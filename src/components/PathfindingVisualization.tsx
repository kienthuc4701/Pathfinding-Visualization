import React from "react";
import Header from "./Header";
import ControlPanel from "./controls/Controls";
import Grid from "./grid/Grid";

const PathFindingVisualization: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <ControlPanel />
        <Grid />
      </main>
    </div>
  );
};

export default PathFindingVisualization;
