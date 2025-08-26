import React, { useEffect, useState, type ChangeEvent, type FC } from "react";
import type { FoodProduct } from "../../../../types/productTypes";
import { categories } from "../../../../types/productTypes";
import { DynamicFieldEditor } from "./DynamicFieldEditorProps ";
import { AddFieldInputs } from "./AddFieldInputs";
import { FormField, type FormFieldProps } from "./FormField";
import { FormCheckbox } from "./FormCheckBox";
import { TagsEditor } from "./TagsEditor";

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

  const fields: Array<Omit<FormFieldProps, "value" | "onChange"> & { name: keyof Partial<FoodProduct> }> = [
    { title: "Назва", name: "name", type: "input" },
    { title: "Опис", name: "description", type: "textarea" },
    { title: "Ціна (в копійках)", name: "price", type: "input", inputType: "number" },
    { title: "Зображення (URL)", name: "img", type: "input" },
    {
      title: "Вага",
      name: "weight",
      type: "select",
      options: [{ value: "1кг" }, { value: "100г" }, { value: "0.5кг" }, { value: "0.5л" }, { value: "1л" }],
    },
    { title: "Категорія", name: "category", type: "select", options: categories.map((c) => ({ value: c.name })) },
    { title: "Знижка (%)", name: "discountPercentage", type: "input", inputType: "number", min: 0, max: 100 },
  ];

  const checkBoxFields: Array<{ label: string; name: keyof Partial<FoodProduct> }> = [
    { label: "Доступний", name: "available" },
    { label: "Новинка", name: "isNew" },
    { label: "Рекомендовано", name: "isRecommended" },
  ];

  return (
    <form
      className="flex flex-col gap-4 p-4 sm:p-6 [&>label>input]:border min-w-[200px] sm:min-w-[700px] max-h-[100vh] sm:max-h-[90vh] scrollbar-hide overflow-y-auto pb-24"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-bold text-center text-gray-700">Редагувати</h3>
      {/* Input feilds */}
      {fields.map((f) => {
        const value = formData[f.name];
        const fieldValue: string | number = typeof value === "string" || typeof value === "number" ? value : "";
        return <FormField key={f.name} {...f} value={fieldValue} onChange={handleChange} />;
      })}

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-4">
        {checkBoxFields.map(({ label, name }) => (
          <FormCheckbox key={name} label={label} name={name} checked={(formData[name] as boolean) ?? false} onChange={handleChange} />
        ))}
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
      <TagsEditor tags={formData.tags ?? []} newTag={newTag} setNewTag={setNewTag} onAdd={handleAddTag} onRemove={handleRemoveTag} />

      <button type="submit" className="btn-primary btn_hover">
        {submitText}
      </button>
    </form>
  );
};
