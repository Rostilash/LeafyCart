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
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; type: "increment" | "decrement" | "set"; value?: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return;

      switch (action.payload.type) {
        case "increment":
          item.quantity += 1;
          break;
        case "decrement":
          item.quantity -= 1;
          if (item.quantity < 1) {
            state.items = state.items.filter((i) => i.id !== action.payload.id);
          }
          break;
        case "set":
          if (action.payload.value && action.payload.value > 0) {
            item.quantity = action.payload.value;
          }
          break;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
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
