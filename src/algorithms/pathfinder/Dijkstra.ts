import { CellType, ICell } from "@/model/Cell";
import { IPathFinder } from "./PathfinderStrategy";
import { PriorityQueue } from "../ultis/PriorityQueue";

interface DijkstraNode {
  cell: ICell;
  distance: number;
  previous: DijkstraNode | null;
}

export default class Dijkstra implements IPathFinder {
  findPath(grid: ICell[][], start: ICell, end: ICell): { path: ICell[], visitedOrder: ICell[] } {
    const nodes: DijkstraNode[][] = grid.map(row =>
      row.map(cell => ({
        cell,
        distance: Infinity,
        previous: null,
      }))
    );

    const startNode = nodes[start.row][start.col];
    startNode.distance = 0;

    const priorityQueue = new PriorityQueue<DijkstraNode>();
    priorityQueue.enqueue(startNode);

    const visitedOrder: ICell[] = [];

    while (!priorityQueue.isEmpty()) {
      const closestNode = priorityQueue.dequeue()!;

      if (closestNode.cell.type === CellType.WALL) continue;

      if (closestNode.distance === Infinity) break;

      visitedOrder.push(closestNode.cell);

      if (closestNode.cell.row === end.row && closestNode.cell.col === end.col) {
        return {
          path: this.reconstructPath(closestNode),
          visitedOrder,
        };
      }

      this.updateUnvisitedNeighbors(closestNode, nodes, priorityQueue);
    }

    return { path: [], visitedOrder };
  }

  private updateUnvisitedNeighbors(
    node: DijkstraNode,
    nodes: DijkstraNode[][],
    priorityQueue: PriorityQueue<DijkstraNode>
  ) {
    const { row, col } = node.cell;
    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];

    for (const [r, c] of neighbors) {
      if (r >= 0 && r < nodes.length && c >= 0 && c < nodes[0].length) {
        const neighbor = nodes[r][c];
        const tentativeDistance = node.distance + 1;
        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance;
          neighbor.previous = node;
          priorityQueue.enqueue(neighbor);
        }
      }
    }
  }

  private reconstructPath(endNode: DijkstraNode): ICell[] {
    const path: ICell[] = [];
    let currentNode: DijkstraNode | null = endNode;

    while (currentNode !== null) {
      path.unshift(currentNode.cell);
      currentNode = currentNode.previous;
    }

    return path;
  }
}