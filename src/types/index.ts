export type CellType = {
    x:number;
    y:number;
    isWall?:boolean;
    isStart?:boolean;
    isEnd?:boolean;
    onClick?():void;
}

export type AlgorithmType = 'DIJKSTRA' | 'BFS' | 'DFS'

export type MazeType = 'NORMAL'|'BINARY_TREE' | 'RECURSIVE_DIVISON'
