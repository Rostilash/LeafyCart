import React, { type ChangeEvent } from "react";

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
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = React.memo(
  ({
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
    error,
  }) => {
    return (
      <label className="flex flex-col gap-1">
        {title}*:
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
        ) : inputType === "tel" ? (
          // need to fix this problem in future for not using div for all our inputs
          <div className="flex">
            <span className="pl-2 py-2 bg-gray-5 border-b border-gray-300 rounded-l">(+380 )</span>
            <input
              name={name}
              type={inputType || "text"}
              value={value}
              onChange={onChange}
              required={required}
              className={className}
              min={min}
              max={max}
              placeholder={title + "..."}
            />
          </div>
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
            placeholder={title + "..."}
          />
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
    );
  }
);
