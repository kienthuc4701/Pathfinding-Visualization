import { GridContext } from "@/contexts/GridContext"
import { useContext } from "react"

export const useGrid = ()=> {
    const context = useContext(GridContext);
    if(!context) throw new Error("useGrid must be used within GridProvider");
    return context;
}