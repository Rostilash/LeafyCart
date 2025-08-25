import { categories } from "../types/productTypes";
import { Coffee, Box, Gift, Apple } from "lucide-react";

export const categoryTree = [
  {
    title: "Продукти харчування",
    icon: <Apple size={16} />,
    subcategories: categories,
  },
  {
    title: "Готові страви",
    icon: <Box size={16} />,
    subcategories: [
      { name: "Сніданки", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmSgfhbd_Ma5dKizbTNZeKsc8edZ4u_hP_XA&s" },
      { name: "Обіди", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjGUpzmbC6dFdqFCjQW6H5BKBD7RYI2c97Q&s" },
      { name: "Вечері", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNl7_j1UW2nzkWGekdln_pqV55xnYYXFyKQ&s" },
      {
        name: "Вегетаріанські/веганські страви",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0MqfeBBqt7P1rtOM0PT96aX77r24AAv1_qg&s",
      },
      { name: "Фітнес меню", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1Kan5gX9X9XiAzFKU6qZvlF1RTtLCAx4_w&s" },
      { name: "Дитяче харчування", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GAm5m1GbSENQiMRB4T61WFepN5LE92uDYA&s" },
    ],
  },
  {
    title: "Комбо-набори / Акції",
    icon: <Gift size={16} />,
    subcategories: [
      { name: "Знижки", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgiT2ItgY0KwK-oTNGORcgg_7y9TnKKwQZg&s" },
      { name: "1+1", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_06EFn9o9WkIYp9cn5i-ylcjLYcWkvpJ4og&s" },
      { name: "Святкові/сезонні пропозиції", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnp3bqY6OiBfS7HekpY8JPXZJU5ftCEUljA&s" },
    ],
  },
  {
    title: "Раціони",
    icon: <Coffee size={16} />,
    subcategories: [
      { name: "На день/тиждень", img: "" },
      { name: "Дієтичні програми", img: "" },
      { name: "Калорійні набори", img: "" },
      { name: "Інтервальне харчування", img: "" },
    ],
  },
];
