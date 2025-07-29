import React, { useEffect, useState, type ChangeEvent, type FC } from "react";
import type { FoodProduct } from "../../../types/productTypes";
import { categories } from "../../../types/productTypes";

interface ProductFormProps {
  initialProduct: Partial<FoodProduct> | null;
  onSubmit: (product: Partial<FoodProduct>) => void;
  submitText?: string;
}

export const ProductForm: FC<ProductFormProps> = ({ initialProduct, onSubmit, submitText = "Зберегти" }) => {
  const [formData, setFormData] = useState<Partial<FoodProduct>>(initialProduct || {});

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      if (!prev) return prev;

      let newValue: any = value;

      if (type === "number") {
        newValue = Number(value);
      }

      if (type === "checkbox" && e.target instanceof HTMLInputElement) {
        newValue = e.target.checked;
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSubmit(formData);
    }
  };

  if (!formData) return null;

  return (
    <form className="flex flex-col gap-4 p-4 [&>label>input]:border w-200" onSubmit={handleSubmit}>
      <label className="flex flex-col">
        Назва:
        <input name="name" type="text" value={formData.name || ""} onChange={handleChange} required />
      </label>

      <label className="flex flex-col">
        Категорія:
        <select name="category" value={formData.category || categories[0]} onChange={handleChange} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Опис:
        <textarea name="description" value={formData.description || ""} onChange={handleChange} required />
      </label>

      <label className="flex flex-col">
        Ціна (в копійках):
        <input name="price" type="number" value={formData.price ?? 0} onChange={handleChange} required />
      </label>

      <label className="flex flex-col">
        Зображення (URL):
        <input name="img" type="text" value={formData.img || ""} onChange={handleChange} />
      </label>

      <label className="flex flex-col">
        Вага:
        <input name="weight" type="text" value={formData.weight || ""} onChange={handleChange} />
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="available" checked={formData.available ?? false} onChange={handleChange} />
        Доступний
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isNew" checked={formData.isNew ?? false} onChange={handleChange} />
        Новинка
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isRecommended" checked={formData.isRecommended ?? false} onChange={handleChange} />
        Рекомендовано
      </label>

      {/* Можна додати nutritionFacts при потребі */}

      <button type="submit" className="bg-blue-500 text-white btn-primary btn_hover">
        {submitText}
      </button>
    </form>
  );
};
