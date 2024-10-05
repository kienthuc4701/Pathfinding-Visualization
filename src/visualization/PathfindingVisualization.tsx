import { MazeGeneratorFactory } from "@/algorithms/mazeGenerator/MazeGeneratorFactory";
import { generateEmptyMaze, getRandomStartEnd } from "@/helpers";
import { MazeAlgorithmType } from "@/model/Algorithm";
import { CellType, ICell } from "@/model/Cell";
import { useState, useCallback, useEffect } from "react";
import ControlPanel from "@/components/controls/ControlPanel";
import Grid from "@/components/grid/Grid";

export default function PathFindingVisualization() {
  const [grid, setGrid] = useState<ICell[][]>([]);
  const [mazeAlgorithm, setMazeAlgorithm] =
    useState<MazeAlgorithmType>("BASIC");
  const [startCell, setStartCell] = useState<ICell>();
  const [endCell, setEndCell] = useState<ICell>();
  const [pathAlgorithm, setPathAlgorithm] = useState<string>("dijkstra");

  const [isDrawingWall, setIsDrawingWall] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<
    CellType.START | CellType.END | null
  >(null);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const newGrid = [...grid];
      const cell = newGrid[row][col];

      if (cell.type !== CellType.START && cell.type !== CellType.END) {
        cell.type =
          cell.type === CellType.WALL ? CellType.BASIC : CellType.WALL;
        setIsDrawingWall(cell.type === CellType.WALL);
        setGrid(newGrid);
      }
    },
    [grid]
  );

  const handleDragSTART = useCallback(
    (row: number, col: number) => {
      const cell = grid[row][col];
      if (cell.type === CellType.START) {
        setIsDragging(CellType.START);
      } else if (cell.type === CellType.END) {
        setIsDragging(CellType.END);
      }
    },
    [grid]
  );

  const handleDragEnter = useCallback(
    (row: number, col: number) => {
      if (!isDragging || grid[row][col].type === CellType.WALL) return;

      const newGrid = [...grid];
      const oldCell = isDragging === CellType.START ? startCell : endCell;

      if (oldCell) {
        newGrid[oldCell.row][oldCell.col].type = CellType.BASIC;
      }

      newGrid[row][col].type = isDragging;
      setGrid(newGrid);
    },
    [grid, isDragging]
  );

  const handleDragEND = useCallback(() => {
    setIsDragging(null);
  }, []);

  const generateNewMaze = (algorithm: MazeAlgorithmType) => {
    const mazeGenerator = MazeGeneratorFactory.create(algorithm);
    const newGrid = mazeGenerator.generate(generateEmptyMaze());
    setGrid(newGrid);
    getRandomStartEnd(newGrid);
  };

  useEffect(() => {
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
