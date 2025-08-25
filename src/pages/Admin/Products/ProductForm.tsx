import React, { useEffect, useState, type ChangeEvent, type FC } from "react";
import type { FoodProduct } from "../../../types/productTypes";
import { categories } from "../../../types/productTypes";
import { DynamicFieldEditor } from "./FormSlices/DynamicFieldEditorProps ";
import { AddFieldInputs } from "./FormSlices/AddFieldInputs";
import { X } from "lucide-react";

interface ProductFormProps {
  initialProduct: Partial<FoodProduct> | null;
  onSubmit: (product: Partial<FoodProduct>) => void;
  closeEditModal: () => void;
  submitText?: string;
}

export const ProductForm: FC<ProductFormProps> = ({ initialProduct, onSubmit, submitText = "Зберегти", closeEditModal }) => {
  const [formData, setFormData] = useState<Partial<FoodProduct>>(initialProduct || {});
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState<string | number | "">("");

  const [newNutritionKey, setNewNutritionKey] = useState("");
  const [newNutritionValue, setNewNutritionValue] = useState<string | number | "">("");

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (initialProduct) {
      setFormData(initialProduct || {});
    }
  }, [initialProduct]);

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags ?? []), newTag.trim()],
    }));
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags ?? []).filter((t) => t !== tag),
    }));
  };

  const handleAddField = (section: "generalInfo" | "nutritionFacts", key: string, value: string | number) => {
    if (!key.trim() || value === "") return;
    if (section === "nutritionFacts" && isNaN(Number(value))) {
      alert("Значення для харчової цінності має бути числом!");
      return;
    }
    console.log(" will work");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key.trim()]: section === "nutritionFacts" ? Number(value) : String(value),
      },
    }));

    if (section === "generalInfo") {
      setNewKey("");
      setNewValue("");
    } else {
      setNewNutritionKey("");
      setNewNutritionValue("");
    }
  };

  const handleRemoveField = (section: "generalInfo" | "nutritionFacts", key: string) => {
    setFormData((prev) => {
      if (!prev[section]) return prev;

      const updatedSection = { ...prev[section] };
      delete updatedSection[key];

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev): Partial<FoodProduct> => {
      let newValue: string | number | boolean | undefined = value;

      if (type === "number") {
        newValue = value === "" ? undefined : Number(value);
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

  const handleDynamicChange = (section: "nutritionFacts" | "generalInfo", key: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
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
      className="flex flex-col gap-4 p-4 sm:p-6 [&>label>input]:border min-w-[200px] sm:min-w-[700px] max-h-[100vh] sm:max-h-[90vh] scrollbar-hide overflow-y-auto pb-24"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold text-center text-gray-700">Редагувати</h3>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Назва:
        <input name="name" type="text" value={formData.name || ""} onChange={handleChange} required className="custum-border-outline px-1 py-2" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Категорія:
        <select
          name="category"
          value={formData.category || categories[0].name}
          onChange={handleChange}
          required
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-500 transition duration-200 px-1 py-2"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
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
          className="custum-border-outline p-2 h-24 resize-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Знижка (%):
        <input
          name="discountPercentage"
          type="number"
          value={formData.discountPercentage ?? ""}
          onChange={handleChange}
          className="custum-border-outline px-1 py-2"
          min={0}
          max={100}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Ціна (в копійках):
        <input name="price" type="number" value={formData.price || ""} onChange={handleChange} required className="custum-border-outline px-1 py-2" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Зображення (URL):
        <input name="img" type="text" value={formData.img || ""} onChange={handleChange} className="custum-border-outline px-1 py-2" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-gray-600">
        Вага:
        <input name="weight" type="text" value={formData.weight || ""} onChange={handleChange} className="custum-border-outline px-1 py-2" />
      </label>

      {/* Checkboxes */}
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

      {/* Nutrifications */}
      <fieldset className="border p-2">
        <legend className="font-semibold">Харчова цінність</legend>
        <AddFieldInputs
          section="nutritionFacts"
          keyValue={newNutritionKey}
          setKeyValue={setNewNutritionKey}
          value={newNutritionValue}
          setValue={setNewNutritionValue}
          onAdd={() => handleAddField("nutritionFacts", newNutritionKey, newNutritionValue)}
        />

        <DynamicFieldEditor
          section="nutritionFacts"
          entries={formData.nutritionFacts ?? {}}
          onChange={(key, val) => handleDynamicChange("nutritionFacts", key, val)}
          onRemove={(key) => handleRemoveField("nutritionFacts", key)}
        />
      </fieldset>

      {/* General Info */}
      <fieldset className="border p-2 rounded-md">
        <legend className="font-semibold">Загальна інформація</legend>
        <AddFieldInputs
          section="generalInfo"
          keyValue={newKey}
          setKeyValue={setNewKey}
          value={newValue}
          setValue={setNewValue}
          onAdd={() => handleAddField("generalInfo", newKey, newValue)}
        />

        <DynamicFieldEditor
          section="generalInfo"
          entries={formData.generalInfo ?? {}}
          onChange={(key, val) => handleDynamicChange("generalInfo", key, val)}
          onRemove={(key) => handleRemoveField("generalInfo", key)}
        />
      </fieldset>

      {/* Tags */}
      <fieldset className="border p-2 rounded-md">
        <legend className="font-semibold">Теги</legend>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Введіть тег (наприклад: 1+1, gift:123)"
            className="custum-border-outline px-2 py-1 flex-1"
          />
          <button type="button" onClick={handleAddTag} className="px-3 py-1 btn-primary-sm btn_hover">
            Додати
          </button>
        </div>

        {/* Tegs Preview */}
        <div className="flex flex-wrap gap-2">
          {(formData.tags ?? []).map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 hover:text-red-700 cursor-pointer">
                <X size={18} />
              </button>
            </span>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn-primary btn_hover">
        {submitText}
      </button>
    </form>
  );
};
