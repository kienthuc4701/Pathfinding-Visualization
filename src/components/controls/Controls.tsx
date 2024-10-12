import { useAlgorithmStore } from '@/stores/algorithmStore'
import { useGridStore } from '@/stores/gridStore'
import { useMazeStore } from '@/stores/mazeStore'
import { useVisualizationStore } from '@/stores/visualizationStore'
import { AlgorithmType, MazeType } from '@/types'
import { MAZE_ALGORITHMS, PATH_ALGORITHMS } from '@/ultis/constants'
import React from 'react'

const Controls: React.FC = () => {
  const { selectedAlgorithm, setSelectedAlgorithm } = useAlgorithmStore()
  const { selectedMazeAlgorithm, setSelectedMazeAlgorithm, generateMaze } = useMazeStore()
  const { visualizePathfinding, isVisualizing } = useVisualizationStore()
  const { resetGrid } = useGridStore()

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value as AlgorithmType)}
        className="px-4 py-2 border rounded"
        disabled={isVisualizing}
      >
        {Object.entries(PATH_ALGORITHMS).map(([key,value])=>{
          return <option key={key} value={key}>{value}</option>
        })}
      </select>
      <select
        value={selectedMazeAlgorithm}
        onChange={(e) => setSelectedMazeAlgorithm(e.target.value as MazeType)}
        className="px-4 py-2 border rounded"
        disabled={isVisualizing}
      >
        {Object.entries(MAZE_ALGORITHMS).map(([key,value])=>{
          return <option key={key} value={key}>{value}</option>
        })}
      </select>
      <button
        onClick={generateMaze}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isVisualizing}
      >
        Generate Maze
      </button>
      <button
        onClick={visualizePathfinding}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={isVisualizing}
      >
        Visualize
      </button>
      <button
        onClick={resetGrid}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        disabled={isVisualizing}
      >
        Reset
      </button>
    </div>
  )
}

export default Controls