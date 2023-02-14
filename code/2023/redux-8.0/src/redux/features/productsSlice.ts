import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { getProducts } from "services/products";

export interface ProductsState {
  products: IProduct[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchAll",
  getProducts
);

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
