import React from "react";

interface AddFieldInputsProps {
  section: "generalInfo" | "nutritionFacts";
  keyValue: string;
  setKeyValue: (v: string) => void;
  value: string | number | "";
  setValue: (v: string | number | "") => void;
  onAdd: () => void;
}

export const AddFieldInputs: React.FC<AddFieldInputsProps> = ({ keyValue, setKeyValue, value, setValue, onAdd }) => (
  <div className="flex justify-between gap-2 items-center mt-2">
    <input
      type="text"
      placeholder="Назва"
      value={keyValue}
      onChange={(e) => setKeyValue(e.target.value)}
      className="px-2 py-1 custum-border-outline "
    />
    <input
      type={typeof value === "number" ? "number" : "text"}
      placeholder="значення"
      value={value}
      onChange={(e) => setValue(typeof value === "number" ? parseFloat(e.target.value) || "" : e.target.value)}
      className="px-2 py-1 custum-border-outline"
    />
    <button type="button" onClick={onAdd} className="btn-primary-sm btn_hover">
      Додати
    </button>
  </div>
);
