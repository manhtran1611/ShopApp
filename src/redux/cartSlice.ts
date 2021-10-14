import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { AppDispatch } from "./store";

export interface CartState {
  items: { [itemId: string]: number };
  checkoutState: "idle" | "pending" | "error";
  errorMessage: string;
}

const initialState: CartState = {
  items: {},
  checkoutState: "idle",
  errorMessage: "",
};

export const getMemorizedNumItems = createSelector(
  (state: RootState) => state.cartReducer.items,
  (items) => {
    console.log("calling get cart");
    let numItems = 0;
    for (let id in items) {
      numItems += items[id];
    }
    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cartReducer.items,
  (state: RootState) => state.productsReducer.entities,
  (items, products) => {
    let total = 0;
    for (let id in items) {
      total += (products[id]?.price as number) * items[id];
    }
    return total;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase("cart/checkout/pending", (state, action) => {
        state.checkoutState = "pending";
        state.items = {};
      })
      .addCase("cart/checkout/fulfilled", (state, action) => {
        state.checkoutState = "idle";
      });
  },
});

export function checkout() {
  return function checkoutThunk(dispatch: AppDispatch) {
    dispatch({ type: "cart/checkout/pending" });
    setTimeout(function () {
      dispatch({ type: "cart/checkout/fulfilled" });
    }, 500);
  };
}

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
