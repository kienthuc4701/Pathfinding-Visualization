import { PointControlContext } from "@/contexts/PointControlContext";
import { useContext } from "react";

export const usePointControl = ()=>{
    const context =  useContext(PointControlContext);
    if(!context) throw new Error("usePointControl must be used within PointControlContext");
    return context;
}