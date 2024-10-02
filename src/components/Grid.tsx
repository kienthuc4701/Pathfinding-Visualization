import { usePathfinder } from "@/hooks/usePathfinder";
import { Cell } from "./Cell";
import { useEffect } from "react";
import { MazeFactory } from "@/algorithms/mazeGenerators";
import { MAZE_CONFIG } from "@/constant";

export const Grid = () => {
  const { grid, setGrid } = usePathfinder();

  useEffect(() => {
    const mazeGenerator = MazeFactory.createMazeGenerator("NORMAL");
    const newGrid = mazeGenerator.generate(
      MAZE_CONFIG.MAX_ROWS,
      MAZE_CONFIG.MAX_COLS
    ); 
    setGrid(newGrid);
  }, []);
  console.log(grid);
  
  return (
    <div className="max-w-screen-sm mx-auto p-2">
      <div className="grid border" style={{gridTemplateColumns: `repeat(${MAZE_CONFIG.MAX_COLS},auto`}}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => <Cell key={`${rowIndex}-${colIndex}`} />)
      )}
    </div>
    </div>
  );
};
