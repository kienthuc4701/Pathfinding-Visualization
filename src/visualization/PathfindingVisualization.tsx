import  { useState, useEffect, useCallback } from 'react';
import { IPathFinder, PathFinderStrategy } from '@/algorithms/pathfinder/PathfinderStrategy';
import { Cell, ICell } from '@/model/Cell';
import { GridSubject, IGridObserver } from '@/model/GridSubject';
import { MazeGeneratorFactory } from '@/algorithms/mazeGenerator/MazeGeneratorFactory';
import BFS from '@/algorithms/pathfinder/BFS';
import DFS from '@/algorithms/pathfinder/DFS';
import Dijkstra from '@/algorithms/pathfinder/Dijkstra';
import ControlPanel from '@/components/controls/ControlPanel';
import Grid from '@/components/grid/Grid';

const GRID_ROWS = 20;
const GRID_COLS = 24;

export default function PathFindingVisualization() {
  const [gridSubject] = useState(() => new GridSubject(initializeGrid()));
  const [grid, setGrid] = useState<ICell[][]>(gridSubject.getGrid());
  const [mazeAlgorithm, setMazeAlgorithm] = useState<string>('basic');
  const [pathAlgorithm, setPathAlgorithm] = useState<string>('dijkstra');
  const [speed, setSpeed] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startCell, setStartCell] = useState<ICell | null>(null);
  const [endCell, setEndCell] = useState<ICell | null>(null);
  const [isDrawingWall, setIsDrawingWall] = useState<boolean>(false);

  useEffect(() => {
    const observer: IGridObserver = {
      update: (updatedGrid: ICell[][]) => {
        setGrid([...updatedGrid]);
      },
    };
    gridSubject.attach(observer);
    return () => gridSubject.detach(observer);
  }, [gridSubject]);

  function initializeGrid(): ICell[][] {
    const newGrid: ICell[][] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: ICell[] = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push(new Cell(row, col));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }

  const handleCellClick = useCallback((row: number, col: number) => {
    if (isRunning) return;

    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (!startCell) {
      cell.type = 'START';
      setStartCell(cell);
    } else if (!endCell) {
      cell.type = 'END';
      setEndCell(cell);
    } else {
      cell.type = cell.type === 'WALL' ? 'EMPTY' : 'WALL';
      setIsDrawingWall(cell.type === 'WALL');
    }

    gridSubject.setGrid(newGrid);
  }, [grid, startCell, endCell, isRunning, gridSubject]);

  const handleCellHover = useCallback((row: number, col: number) => {
    if (isRunning || !isDrawingWall) return;

    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (cell.type === 'EMPTY') {
      cell.type = 'WALL';
      gridSubject.setGrid(newGrid);
    }
  }, [grid, isRunning, isDrawingWall, gridSubject]);

  const generateNewMaze = useCallback((algorithm: string) => {
    const mazeGenerator = MazeGeneratorFactory.create(algorithm);
    const newGrid = mazeGenerator.generate(grid);
    setGrid(newGrid);
  }, [mazeAlgorithm]);

  const visualizePath = useCallback(async () => {
    if (isRunning || !startCell || !endCell) return;
    setIsRunning(true);

    const pathFinder = new PathFinderStrategy(getPathFinderByType(pathAlgorithm));
    const path = pathFinder.findPath(grid, startCell, endCell);

    for (const cell of path) {
      await new Promise((resolve) => setTimeout(resolve, 1000 - speed * 10));
      const newGrid = [...grid];
      newGrid[cell.row][cell.col].type = 'PATH';
      gridSubject.setGrid(newGrid);
    }

    setIsRunning(false);
  }, [grid, startCell, endCell, isRunning, pathAlgorithm, speed, gridSubject]);

  const getPathFinderByType = (type: string): IPathFinder => {
    switch (type) {
     
      case 'bfs':
        return new BFS();
      case 'dfs':
        return new DFS();
      default:
        return new Dijkstra();
    }
  };
  
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Path Finding Visualization</h1>
      <ControlPanel
        mazeAlgorithm={mazeAlgorithm}
        setMazeAlgorithm={setMazeAlgorithm}
        pathAlgorithm={pathAlgorithm}
        setPathAlgorithm={setPathAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        onGenerateMaze={generateNewMaze}
        onVisualizePath={visualizePath}
        isRunning={isRunning}
      />
      <Grid grid={grid} onCellClick={handleCellClick}/>
    </div>
  );
}