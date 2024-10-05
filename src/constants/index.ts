export const THRESH_HOLD_WALL = 0.32;

export const MAZE = {
    cols: 24,
    rows:20,
    options: [
        { value:  "BASIC" , label: 'Basic Maze' },
        { value: "RANDOM", label: 'Random Maze' },
        { value: "BINARY_TREE", label: 'Binary Tree Maze' },
        { value: "RECURSIVE_DIVISION", label: 'Recursive Division Maze' },
    ]
}

  const pathOptions = [
    { value: 'DIJKSTRA', label: 'Dijkstra' },
    { value: 'A_START', label: 'A*' },
    { value: 'BFS', label: 'BFS' },
    { value: 'DFS', label: 'DFS' },
  ];
