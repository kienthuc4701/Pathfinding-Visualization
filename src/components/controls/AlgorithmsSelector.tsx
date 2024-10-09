import { useAppContext } from "@/contexts/AppContext";
import React from "react";

interface AlgorithmSelectorProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  disabled: boolean;
}
const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  label,
  value,
  options,
}) => {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <label className="mr-2">{label}</label>
      <select
        className="border p-2 rounded"
        value={value}
        disabled={state.isVisualizing}
        onChange={(e) =>
          dispatch({ type: "SET_MAZE_ALGORITHM", payload: e.target.value })
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlgorithmSelector;
