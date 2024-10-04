import { Cell } from "@/model/Cell";
import { createContext, useState } from "react";

interface PointControlContextProps {
  startPoint: Cell | null;
  endPoint: Cell | null;
  setStartPoint: (cell: Cell) => void;
  setEndPoint: (Cell: Cell) => void;
}

export const PointControlContext =
  createContext<PointControlContextProps | null>(null);

export const PooitControlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startPoint, setStartPoint] = useState<Cell | null>(null);
  const [endPoint, setEndPoint] = useState<Cell | null>(null);
  return (
    <PointControlContext.Provider
      value={{ startPoint, endPoint, setStartPoint, setEndPoint }}
    >
      {children}
    </PointControlContext.Provider>
  );
};
