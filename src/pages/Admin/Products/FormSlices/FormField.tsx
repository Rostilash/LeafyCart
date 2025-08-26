import type { ChangeEvent, FC } from "react";

type FieldType = "input" | "textarea" | "select";

export interface FormFieldProps {
  title: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: "input" | "textarea" | "select";
  inputType?: string;
  name: string;
  required?: boolean;
  className?: string;
  options?: { value: string }[];
  min?: number;
  max?: number;
}

export const FormField: FC<FormFieldProps> = ({
  title,
  value,
  onChange,
  type = "input",
  name,
  required = false,
  className = "custum-border-outline px-1 py-2",
  options,
  inputType,
  min,
  max,
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-600">
      {title}:
      {type === "textarea" ? (
        <textarea name={name} value={value} onChange={onChange} required={required} className={`${className} resize-none h-24`} />
      ) : type === "select" ? (
        <select name={name} value={value} onChange={onChange} required={required} className={className}>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={inputType || "text"}
          value={value}
          onChange={onChange}
          required={required}
          className={className}
          min={min}
          max={max}
        />
      )}
    </label>
  );
};
