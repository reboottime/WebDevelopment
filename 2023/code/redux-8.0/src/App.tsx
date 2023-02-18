import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Cart from "./features/cart";
import Counter from "./features/counter";
import Products from "./features/products";

function App() {
  return (
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route path="/">
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
