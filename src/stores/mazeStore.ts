import {create} from 'zustand'
import { useGridStore } from './gridStore'
import { MazeType } from '@/types'
import { getMaze } from '@/algorithms/maze'

interface MazeState {
  selectedMazeAlgorithm: MazeType
  setSelectedMazeAlgorithm: (algorithm: MazeType) => void
  generateMaze: () => void
}

export const useMazeStore = create<MazeState>((set, get) => ({
  selectedMazeAlgorithm: 'NORMAL',
  setSelectedMazeAlgorithm: (selectedMazeAlgorithm) => set({ selectedMazeAlgorithm }),

  generateMaze: () => {
    const { grid,startPoint, endPoint, setGrid } = useGridStore.getState()
    const { selectedMazeAlgorithm } = get()
    const newGrid = getMaze(selectedMazeAlgorithm, grid, startPoint, endPoint )
    setGrid(newGrid)
  },
}))