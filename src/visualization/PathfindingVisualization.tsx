import { MazeGeneratorFactory } from "@/algorithms/mazeGenerator/MazeGeneratorFactory";
import ControlPanel from "@/components/controls/ControlPanel";
import Grid from "@/components/grid/Grid";
import { generateEmptyMaze, getRandomStartEnd } from "@/helpers";
import { ICell } from "@/model/Cell";
import { useState, useCallback, useEffect } from "react";

export default function PathFindingVisualization() {
  const [grid, setGrid] = useState<ICell[][]>(() => generateEmptyMaze());
  const [mazeAlgorithm, setMazeAlgorithm] = useState<string>("empty");
  const [pathAlgorithm, setPathAlgorithm] = useState<string>("dijkstra");

  const [startCell, setStartCell] = useState<ICell>();
  const  [endCell, setEndCell] = useState<ICell>();


  const [isDrawingWall, setIsDrawingWall] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<"START" | "END" | null>(null);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const newGrid = [...grid];
      const cell = newGrid[row][col];

      if (cell.type !== "START" && cell.type !== "END") {
        cell.type = cell.type === "WALL" ? "EMPTY" : "WALL";
        setIsDrawingWall(cell.type === "WALL");
        setGrid(newGrid);
      }
    },
    [grid]
  );

  const handleDragSTART = useCallback(
    (row: number, col: number) => {
      const cell = grid[row][col];
      if (cell.type === "START") {
        setIsDragging("START");
      } else if (cell.type === "END") {
        setIsDragging("END");
      }
    },
    [grid]
  );

  const handleDragEnter = useCallback(
    (row: number, col: number) => {
      if (!isDragging || grid[row][col].type === "WALL") return;

      const newGrid = [...grid];
      const oldCell = isDragging === "START" ? startCell : endCell;

      if (oldCell) {
        newGrid[oldCell.row][oldCell.col].type = "EMPTY";
      }

      newGrid[row][col].type = isDragging;
      setGrid(newGrid);
    },
    [grid, isDragging]
  );

  const handleDragEND = useCallback(() => {
    setIsDragging(null);
  }, []);

  const generateNewMaze = (algorithm: string) => {
    const mazeGenerator = MazeGeneratorFactory.create(algorithm);
    const newGrid = mazeGenerator.generate(grid);
    setGrid(newGrid);
    getRandomStartEnd(newGrid);
  };


  useEffect(()=> {
    generateNewMaze(mazeAlgorithm);
}, [mazeAlgorithm]); 

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
      <ControlPanel
        mazeAlgorithm={mazeAlgorithm}
        setMazeAlgorithm={(algorithm) => {
          setMazeAlgorithm(algorithm);
        }}
        pathAlgorithm={pathAlgorithm}
        setPathAlgorithm={setPathAlgorithm}
      />
      <Grid
        grid={grid}
        onCellClick={handleCellClick}
        onDragStart={handleDragSTART}
        onDragEnter={handleDragEnter}
        onDragEnd={handleDragEND}
      />
    </div>
  );
}
