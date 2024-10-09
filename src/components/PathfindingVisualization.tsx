import React from "react";
import Grid from "./grid/Grid";
import ControlPanel from "./controls/ControlPanel";

const PathFindingVisualization: React.FC = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="mx-auto max-w-screen-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
        <ControlPanel />
        <Grid />
      </div>
    </div>
  );
};

export default PathFindingVisualization;
