import type { ChangeEvent, FC } from "react";

interface FormRadioProps {
  name: string;
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  img: string;
  size: number;
}

export const FormRadio: FC<FormRadioProps> = ({ name, value, onChange, checked, title, img, size }) => {
  return (
    <label className="flex gap-2 items-center">
      {img && <img src={img} alt={img} className={`w-[${size}px], h-[${size}px] `} />}
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span>{title}</span>
    </label>
  );
};
