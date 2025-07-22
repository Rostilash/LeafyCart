import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cartTypes";

interface CartState {
  items: CartItem[];
}

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {},
    updateQuantity: (state, action: PayloadAction<{ id: number; type: "incriment" | "decrement" }>) => {},
    removeFromCart: (state, action: PayloadAction<number>) => {},
    clearCart: (state) => {},
  },
});
