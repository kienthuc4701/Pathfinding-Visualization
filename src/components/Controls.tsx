import React from 'react';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PathFindingAlgorithmName, MazeAlgorithmName } from '@/types';

interface ControlsProps {
  onPathFindingAlgorithmChange: (algorithm: PathFindingAlgorithmName) => void;
  onMazeAlgorithmChange: (algorithm: MazeAlgorithmName) => void;
  onVisualize: () => void;
  onGenerateMaze: () => void;
  onClearGrid: () => void;
  onSpeedChange: (speed: number) => void;
  isVisualizing: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onPathFindingAlgorithmChange,
  onMazeAlgorithmChange,
  onVisualize,
  onGenerateMaze,
  onClearGrid,
  onSpeedChange,
  isVisualizing,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Select onValueChange={(value) => onPathFindingAlgorithmChange(value as PathFindingAlgorithmName)} disabled={isVisualizing}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
          <SelectItem value="aStar">A* Algorithm</SelectItem>
          <SelectItem value="bfs">Breadth-First Search</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => onMazeAlgorithmChange(value as MazeAlgorithmName)} disabled={isVisualizing}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Maze Algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="binaryTree">Binary Tree</SelectItem>
          <SelectItem value="recursiveDivision">Recursive Division</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onVisualize} disabled={isVisualizing}>Visualize</Button>
      <Button onClick={onGenerateMaze} disabled={isVisualizing}>Generate Maze</Button>
      <Button onClick={onClearGrid} variant="outline" disabled={isVisualizing}>Clear Grid</Button>
      <div className="flex items-center gap-2">
        <span>Speed:</span>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={(value) => onSpeedChange(value[0])}
          className="w-[200px]"
          disabled={isVisualizing}
        />
      </div>
    </div>
  );
};

export default Controls;