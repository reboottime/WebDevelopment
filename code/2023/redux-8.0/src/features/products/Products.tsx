import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  fetchProductsAsync,
  selectProducts,
} from "redux/features/productsSlice";
import { addItem, selectCartItems } from "redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const ProductItem: React.FC<IProduct> = ({ ...item }) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(addItem(item));
  };

  return (
    <div className="row">
      <span className="col-6">{item.name}</span>
      <span className="col-4">
        {item.price} {item.unit}
      </span>
      <button
        className="col-2 btn btn-primary btn-sm"
        onClick={handleButtonClick}
      >
        +
      </button>
    </div>
  );
};

export const Products: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const cartItems = useAppSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const cartIsEmpty = cartItems.length === 0;

  return (
    <div className="container">
      <div className="products">
        <div className="products__bar row">
          <h4 className="products__bar-title col-8">All Products</h4>
          <p className="col-4 text-end">
            {cartIsEmpty ? (
              "cart is empty"
            ) : (
              <Link to="/cart" className="btn btn-primary btn-sm">
                check out
                <span className="badge badge-info">{cartItems.length}</span>
              </Link>
            )}
          </p>
        </div>
        <ul className="products__list list-group">
          {products.map((item) => (
            <li key={item.name} className="list-group-item">
              <ProductItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
