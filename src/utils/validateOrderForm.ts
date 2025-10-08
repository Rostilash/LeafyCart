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

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email обов'язковий";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return "Некоректний формат email";
  return null;
};

export const validatePassword = (password: string, options?: { minLength?: number; strict?: boolean }): string | null => {
  const { minLength = 8, strict = true } = options || {};

  if (!password.trim()) return "Пароль обов'язковий";
  if (password.length < minLength) return `Пароль має бути не коротше ${minLength} символів`;
  if (password.length > 30) return `Пароль має бути не більше 30 символів`;

  if (strict) {
    if (!/[A-ZА-ЯЁІЇЄҐ]/.test(password)) return "Пароль має містити хоча б одну велику літеру";
    if (!/[a-zа-яёіїєґ]/.test(password)) return "Пароль має містити хоча б одну маленьку літеру";
    if (!/\d/.test(password)) return "Пароль має містити хоча б одну цифру";
    if (!/[!@#$%^&*]/.test(password)) return "Пароль має містити хоча б один спецсимвол";
  }

  return null;
};

export interface AuthFormData {
  email: string;
  password: string;
}

export const validateAuthForm = (data: AuthFormData, mode: "login" | "register") => {
  const errors: Partial<AuthFormData> = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password, { strict: mode === "register" });
  if (passwordError) errors.password = passwordError;

  return null;
};

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-ZА-ЯЁІЇЄҐ]/.test(password)) score++;
  if (/[a-zа-яёіїєґ]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;
  return score;
};

export const getStrengthLabel = (score: number) => {
  if (score <= 2) return "Слабкий";
  if (score === 3 || score === 4) return "Середній";
  return "Сильний";
};
