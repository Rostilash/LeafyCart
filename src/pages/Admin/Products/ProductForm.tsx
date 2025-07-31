import React, { useEffect, useState, type ChangeEvent, type FC } from "react";
import type { FoodProduct } from "../../../types/productTypes";
import { categories } from "../../../types/productTypes";

interface ProductFormProps {
  initialProduct: Partial<FoodProduct> | null;
  onSubmit: (product: Partial<FoodProduct>) => void;
  closeEditModal: () => void;
  submitText?: string;
}

export const ProductForm: FC<ProductFormProps> = ({ initialProduct, onSubmit, submitText = "Зберегти", closeEditModal }) => {
  const [formData, setFormData] = useState<Partial<FoodProduct>>(initialProduct || {});

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct || {});
    }
  }, [initialProduct]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev): Partial<FoodProduct> => {
      let newValue: any = value;

      if (type === "number") {
        newValue = value === "" ? undefined : Number(value);
      }

      if (type === "checkbox" && e.target instanceof HTMLInputElement) {
        newValue = e.target.checked;
      }

      if (name.startsWith("nutritionFacts.")) {
        const key = name.split(".")[1] as keyof NonNullable<FoodProduct["nutritionFacts"]>;

        return {
          ...prev,
          nutritionFacts: {
            ...prev?.nutritionFacts,
            [key]: newValue,
          },
        };
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
      closeEditModal();
    }
  };

  if (!formData) return null;

  return (
    <form
      className="flex flex-col gap-4 p-4 sm:p-6 [&>label>input]:border min-w-[200px] sm:min-w-[700px]  overflow-y-auto max-h-[90vh]"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold text-center text-gray-700">Додати продукт</h3>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Назва:
        <input
          name="name"
          type="text"
          value={formData.name || ""}
          onChange={handleChange}
          required
          className="border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Категорія:
        <select
          name="category"
          value={formData.category || categories[0]}
          onChange={handleChange}
          required
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Опис:
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          required
          className="border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200 p-2 h-24 resize-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Ціна (в копійках):
        <input
          name="price"
          type="number"
          value={formData.price || ""}
          onChange={handleChange}
          required
          className="border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Зображення (URL):
        <input
          name="img"
          type="text"
          value={formData.img || ""}
          onChange={handleChange}
          className="border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Вага:
        <input
          name="weight"
          type="text"
          value={formData.weight || ""}
          onChange={handleChange}
          className="border-b border-gray-300 focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        />
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="available" checked={formData.available ?? false} onChange={handleChange} />
          Доступний
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="isNew" checked={formData.isNew ?? false} onChange={handleChange} />
          Новинка
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="isRecommended" checked={formData.isRecommended ?? false} onChange={handleChange} />
          Рекомендовано
        </label>
      </div>

      <fieldset className="border p-4 rounded-md">
        <legend className="font-semibold">Харчова цінність</legend>

        <label className="flex flex-col">
          Калорії (ккал):
          <input
            name="nutritionFacts.calories"
            type="number"
            value={formData.nutritionFacts?.calories ?? ""}
            onChange={handleChange}
            className="border-b border-gray-400 focus:outline-none focus:border-green-500 px-1 py-2"
          />
        </label>

        <label className="flex flex-col">
          Білки (г):
          <input
            name="nutritionFacts.protein"
            type="number"
            value={formData.nutritionFacts?.protein ?? ""}
            onChange={handleChange}
            className="border-b border-gray-400 focus:outline-none focus:border-green-500 px-1 py-2"
          />
        </label>

        <label className="flex flex-col">
          Жири (г):
          <input
            name="nutritionFacts.fat"
            type="number"
            value={formData.nutritionFacts?.fat ?? ""}
            onChange={handleChange}
            className="border-b border-gray-400 focus:outline-none focus:border-green-500 px-1 py-2"
          />
        </label>

        <label className="flex flex-col">
          Вуглеводи (г):
          <input
            name="nutritionFacts.carbs"
            type="number"
            value={formData.nutritionFacts?.carbs ?? ""}
            onChange={handleChange}
            className="border-b border-gray-400 focus:outline-none focus:border-green-500 px-1 py-2"
          />
        </label>
      </fieldset>

      <button type="submit" className="bg-blue-500 text-white btn-primary btn_hover">
        {submitText}
      </button>
    </form>
  );
};
