import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartItem extends IProduct {
  amount: number;
}

export interface CartState {
  items: CartItem[];
  status: "idle" | "loading" | "failed";
}

const initialState: CartState = {
  items: [],
  status: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload: product }: PayloadAction<IProduct>) => {
      const items = state.items;
      const productIndex = items.findIndex(
        (item) => item.name === product.name
      );

      if (productIndex === -1) {
        state.items = [...items, { ...product, amount: 1 }];
      } else {
        items[productIndex] = {
          ...product,
          amount: items[productIndex].amount + 1,
        };
        state.items = [...items];
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateItem: (
      state,
      action: PayloadAction<Omit<CartItem, "unit" | "price">>
    ) => {
      const { name, amount } = action.payload;

      if (amount <= 0) {
        state.items = state.items.filter((item) => item.name !== name);
      } else {
        const productIndex = state.items.findIndex(
          (item) => item.name === name
        );

        if (productIndex !== -1) {
          state.items[productIndex] = {
            ...state.items[productIndex],
            amount,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cartCheckoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cartCheckoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(cartCheckoutAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addItem, removeItem, updateItem } = cartSlice.actions;

export const cartCheckoutAsync = createAsyncThunk(
  "cart/checkout",
  () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    })
);

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
