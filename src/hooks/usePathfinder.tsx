import { PathfinderContext } from "@/contexts/PathfinderContext";
import { useContext } from "react";

export const usePathfinder = () => {
  const context = useContext(PathfinderContext);
  if (!context)
    throw new Error("usePathfinder must be used within PathfinderProvider!");
  return context;
};
