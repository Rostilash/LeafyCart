import type { ChangeEvent, FC } from "react";

interface FormRadioProps {
  name: string;
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const FormRadio: FC<FormRadioProps> = ({ name, value, onChange, checked, title }) => {
  return (
    <label className="flex gap-2 items-center">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span>{title}</span>
    </label>
  );
};
