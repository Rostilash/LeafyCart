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
  <div className="grid grid-cols-[1fr_1fr_80px] sm:grid-cols-[2fr,1fr,auto] gap-2 items-center mt-2">
    <input
      type="text"
      placeholder="Назва"
      value={keyValue}
      onChange={(e) => setKeyValue(e.target.value)}
      className="px-2 py-1 custum-border-outline w-full"
    />
    <input
      type={typeof value === "number" ? "number" : "text"}
      placeholder="Значення"
      value={value}
      onChange={(e) => setValue(typeof value === "number" ? parseFloat(e.target.value) || "" : e.target.value)}
      className="px-2 py-1 custum-border-outline w-full"
    />
    <button type="button" onClick={onAdd} className="btn-primary-sm btn_hover">
      Додати
    </button>
  </div>
);
