import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counterSlice";
import productsReducer from "./features/productsSlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    counter: counterReducer,
    products: productsReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
