import { AlgorithmType } from '@/types'
import {create} from 'zustand'

interface AlgorithmState {
  selectedAlgorithm: AlgorithmType
  setSelectedAlgorithm: (algorithm: AlgorithmType) => void
}

export const useAlgorithmStore = create<AlgorithmState>((set) => ({
  selectedAlgorithm: 'DIJKSTRA',
  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
}))
