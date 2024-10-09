import { Dijkstra } from './Dijkstra';
import { IPathFinder } from '@/types';

export const pathfinders: { [key: string]: IPathFinder } = {
  DIJKSTRA: new Dijkstra(),
  // Add other pathfinders here as you implement them
  // aStar: new AStarPathFinder(),
  // bfs: new BFSPathFinder(),
  // dfs: new DFSPathFinder(),
};