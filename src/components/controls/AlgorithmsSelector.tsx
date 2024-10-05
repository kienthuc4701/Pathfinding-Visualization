import { MazeAlgorithmType } from "@/model/Algorithm";
import React from "react";

interface AlgorithmSelectorProps {
  label: string;
  value: MazeAlgorithmType;
  onChange: (value: MazeAlgorithmType) => void;
  options: { value: string; label: string }[];
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="mr-2">{label}</label>
      <select
        className="border p-2 rounded"
        value={value}
        onChange={(e) => onChange(e.target.value as MazeAlgorithmType) }
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
