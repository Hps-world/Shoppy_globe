import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem("shoppy_cart_v1");
const initialState = {
  items: saved ? JSON.parse(saved) : []
};

function persist(items) {
  localStorage.setItem("shoppy_cart_v1", JSON.stringify(items));
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((it) => it.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      persist(state.items);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((it) => it.id !== id);
      persist(state.items);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      persist(state.items);
    },
    clearCart(state) {
      state.items = [];
      persist(state.items);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
