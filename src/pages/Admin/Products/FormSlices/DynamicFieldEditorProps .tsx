import React from "react";
import { Trash2 } from "lucide-react";

interface DynamicFieldEditorProps {
  section: "generalInfo" | "nutritionFacts";
  entries: Record<string, string | number>;
  onChange: (key: string, value: string | number) => void;
  onRemove: (key: string) => void;
}

export const DynamicFieldEditor: React.FC<DynamicFieldEditorProps> = ({ section, entries, onChange, onRemove }) => (
  <>
    {Object.entries(entries).map(([key, value]) => (
      <label key={key} className="grid grid-cols-3 w-xs  items-center gap-5 text-sm text-gray-600 capitalize">
        {key.replace(/([A-Z])/g, " $1")}:
        <input
          type={typeof value === "number" ? "number" : "text"}
          value={value}
          onChange={(e) => onChange(key, typeof value === "number" ? parseFloat(e.target.value) : e.target.value)}
          className="border-b px-1 py-2 w-30 pl-2"
        />
        <button type="button" onClick={() => onRemove(key)} className="text-red-500 mt-1 flex justify-center">
          <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer" />
        </button>
      </label>
    ))}
  </>
);
