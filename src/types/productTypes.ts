export const categories = [
  { name: "Овочі", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHRG50Zjk6NZOqgd9uZf63gFlYMpwStp3eA&s" },
  { name: "Фрукти", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhQxggkqBj9Hwuhum-zzN4FlWwgFPTdeYm5g&s" },
  { name: "Солодощі", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiOjaaUCurYpOs1lvdaa9VrfpPGtpUr3D9A&s" },
  { name: "Напої", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fkyvcsRAkQVt47pZe3v4uwnNohdMsOggJw&s" },
  { name: "М'ясо та риба", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtYRvJq4p6frC6kmHo-J1nMtjqUOwZSVdZA&s" },
  { name: "Заморожені", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSw6TQLy4pmXB5aRgYhHUSG-mDWX7D6jpi8g&s" },
  { name: "Соуси", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2oPiIDxb5gEu0Vgz2VhlOAPpOP3bOpBaefg&s" },
  { name: "Бакалія", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAyv3iIFf7kfo7NqYuX0PkAW5g_dMJbmDkbA&s" },
  { name: "Спеції", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXr4pL_X53M0Zntk6ZlPLTA8GhLjFjSiKr9Q&s" },
  { name: "Молочні продукти", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQkItJUr8s4eoRPRTGaIAxaftPp6yuoCxyfw&s" },
] as const;

export type Category = (typeof categories)[number]["name"];

export interface FoodProduct {
  id: string;
  name: string;
  category: Category;
  description: string;
  img: string;

  price: number;
  discountPercentage?: number;
  discountEndDate?: string; // should work on it in future

  weight: string;
  tags?: string[];
  available: boolean; // is in the shop
  isNew?: boolean;
  isRecommended?: boolean;

  rating?: number;
  ratingCount?: number;
  userRating?: number | null; // current user Rating

  nutritionFacts?: Record<string, number>;
  generalInfo?: Record<string, string>;
  createdAt?: string | null;
}

export interface ProductState {
  products: FoodProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: FoodProduct | null;
}
