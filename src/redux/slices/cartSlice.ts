import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cartTypes";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action);
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; type: "increment" | "decrement" }>) => {
      console.log(action);
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.type === "increment") {
          item.quantity += 1;
        } else {
          item.quantity -= 1;
        }
        if (item.quantity < 1) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers(builder) {},
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
