import type { OrderFormData } from "../redux/slices/orderSlice";

export const validateOrderForm = (formData: OrderFormData) => {
  let valid = true;
  const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

  const rules: Record<keyof OrderFormData, ((value: string) => string | null)[]> = {
    name: [
      (v) => (!v.trim() ? "Ім'я обов'язкове" : null),
      (v) => (v.trim().length < 4 ? "Мінімум 4 символи" : null),
      (v) => (v.trim().length > 20 ? "Максимум 20 символів" : null),
    ],
    email: [
      (v) => (!v.trim() ? "Email обов'язковий" : null),
      (v) => (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ? "Некоректний email" : null),
    ],
    last_name: [
      (v) => (!v.trim() ? "Прізвище обов'язкове" : null),
      (v) => (v.trim().length < 4 ? "Мінімум 4 символи" : null),
      (v) => (v.trim().length > 20 ? "Максимум 20 символів" : null),
    ],
    mid_name: [
      (v) => (!v.trim() ? "По батькові обов'язкове" : null),
      (v) => (v.trim().length < 4 ? "Мінімум 4 символи" : null),
      (v) => (v.trim().length > 20 ? "Максимум 20 символів" : null),
    ],
    phone_number: [
      (v) => (!v.trim() ? "Номер телефону обов'язковий" : null),
      (v) => (v.trim().length < 9 ? "В номері має бути мінімум 9 цифр" : null),
      (v) => (v.trim().length > 12 ? "В номері не більше 12 цифр" : null),
    ],
    city: [(v) => (!v.trim() ? "Місто обов'язкове" : null)],
    cityRef: [],
    warehouse: [(v) => (!v.trim() ? "Оберіть адресу Нової Пошти" : null)],
    payment: [],
  };

  (Object.keys(rules) as (keyof OrderFormData)[]).forEach((key) => {
    for (const rule of rules[key]) {
      const error = rule(formData[key] ?? "");
      if (error) {
        newErrors[key] = error;
        valid = false;
        break;
      }
    }
  });

  return { valid, errors: newErrors };
};

export const formatPhone = (value: string) => value.replace(/\D/g, "").slice(0, 9);

export function sanitizeFirestoreData(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeFirestoreData);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, sanitizeFirestoreData(v === undefined ? null : v)]));
  }
  return obj;
}
