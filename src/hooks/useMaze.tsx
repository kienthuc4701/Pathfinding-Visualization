import { MazeContext } from "@/contexts/MazeContext"
import { useContext } from "react"

export const useMaze = ()=> {
    const context = useContext(MazeContext);
    if(!context) throw new Error("useMaze must be used within MazeProvider");
    return context;
}