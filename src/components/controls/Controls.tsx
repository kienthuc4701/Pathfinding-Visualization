import { useAlgorithmStore } from "@/stores/algorithmStore";
import { useGridStore } from "@/stores/gridStore";
import { useMazeStore } from "@/stores/mazeStore";
import { useVisualizationStore } from "@/stores/visualizationStore";
import { MAZE_ALGORITHMS, PATH_ALGORITHMS, SPEEDS } from "@/ultis/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { Fragment } from "react";
import { AlgorithmType, MazeType } from "@/types";
import { Button } from "../ui/button";

const Controls: React.FC = () => {
  const { selectedAlgorithm, setSelectedAlgorithm } = useAlgorithmStore();
  const { selectedMazeAlgorithm, setSelectedMazeAlgorithm, generateMaze } =
    useMazeStore();
  const { visualizePathfinding, isVisualizing, speed, setSpeed } =
    useVisualizationStore();
  const { resetGrid } = useGridStore();

  const isDisabled = isVisualizing;

  return (
    <Fragment>
      <div className="flex gap-4 mb-4">
        <Select
          value={selectedAlgorithm}
          onValueChange={(value) =>
            setSelectedAlgorithm(value as AlgorithmType)
          }
          disabled={isDisabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select algorithm:" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PATH_ALGORITHMS).map(([key, value]) => (
              <SelectItem key={`${key}-${value}`} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedMazeAlgorithm}
          onValueChange={(value) => setSelectedMazeAlgorithm(value as MazeType)}
          disabled={isDisabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select maze algorithm:" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MAZE_ALGORITHMS).map(([key, value]) => (
              <SelectItem key={`${key}-${value}`} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={speed.toString()}
          onValueChange={(value) => setSpeed(Number.parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select speed:" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SPEEDS).map(([key, value]) => (
              <SelectItem key={key} value={value.toString()}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4 mb-4">
        <Button onClick={generateMaze} disabled={isDisabled}>
          Generate Maze
        </Button>
        <Button onClick={visualizePathfinding} disabled={isDisabled}>
          Visualize
        </Button>
        <Button onClick={resetGrid} disabled={isDisabled}>
          Reset
        </Button>
      </div>
    </Fragment>
  );
};

export default Controls;
