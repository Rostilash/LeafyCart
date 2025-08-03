import React from "react";

interface AddFieldInputsProps {
  section: "generalInfo" | "nutritionFacts";
  keyValue: string;
  setKeyValue: (v: string) => void;
  value: string | number | "";
  setValue: (v: any) => void;
  onAdd: () => void;
}

export const AddFieldInputs: React.FC<AddFieldInputsProps> = ({ keyValue, setKeyValue, value, setValue, onAdd }) => (
  <div className="flex gap-2 items-center mt-2">
    <input
      type="text"
      placeholder="ключ"
      value={keyValue}
      onChange={(e) => setKeyValue(e.target.value)}
      className="px-2 py-1 custum-border-outline "
    />
    <input
      type={typeof value === "number" ? "number" : "text"}
      placeholder="значення"
      value={value}
      onChange={(e) => setValue(typeof value === "number" ? parseFloat(e.target.value) || "" : e.target.value)}
      className="custum-border-outline"
    />
    <button type="button" onClick={onAdd} className="btn-primary-sm">
      Додати
    </button>
  </div>
);
