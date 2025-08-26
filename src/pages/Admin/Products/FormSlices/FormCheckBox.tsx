import type { FC, ChangeEvent } from "react";

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({ label, checked, onChange, name }) => (
  <label className="inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    {label}
  </label>
);
