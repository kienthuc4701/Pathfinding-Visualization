import React from "react";

interface AlgorithmSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled: boolean;
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
        onChange={(e) => onChange(e.target.value)}
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
