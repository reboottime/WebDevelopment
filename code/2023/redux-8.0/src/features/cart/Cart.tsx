import classnames from 'classnames';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CartItem } from "./typings";

import {
  removeItem,
  selectCartItems,
  updateItem,
} from "redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import styles from './Cart.module.css';

const Product: React.FC<CartItem> = ({ ...product }) => {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleAmountClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setIsEditing(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amount = parseInt(e.target.value);

    amount = (isNaN(amount) || amount === 0)
      ? 1
      : amount;

    dispatch(
      updateItem({
        name: product.name,
        amount,
      })
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditing(false);
  };

  const handleRemoveClick = () => {
    dispatch(removeItem(product.name));
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    });

    window.addEventListener("click", (e) => {
      setIsEditing(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="row align-items-center">
        <span className="product__name col-4">{product.name}</span>
        <div className="product__amount col-5">
          {isEditing ? (
            <form onSubmit={handleFormSubmit} className="form">
              <input
                name="amount"
                className="form-control"
                onChange={handleAmountChange}
                value={product.amount}
                disabled={!isEditing}
                onClick={(e) => e.stopPropagation()}
              />
            </form>
          ) : (
            <div className="product__amount" onClick={handleAmountClick}>
              {product.amount}
            </div>
          )}
        </div>
        <span className="product__total-price col-2">
          {product.price} {product.unit}
        </span>
        <button
          className="product__remove col-1 btn btn-danger btn-sm"
          onClick={handleRemoveClick}
        >
          x
        </button>
      </div>
    </div>
  );
};

export const Cart = () => {
  const items = useAppSelector(selectCartItems);

  const subTotal = items.reduce((acc, cur) => {
    return acc + cur.price * cur.amount;
  }, 0);

  return (
    <div className="cart container">
      <h4 className="cart__title">Cart</h4>
      {items.length ? (
        <ul className={classnames("list-group", styles.products)}>
          {items.map((item) => (
            <li key={item.name} className="list-group-item">
              <Product {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>your cart is empty</p>
      )}

      <p className="row align-items-center justify-content-between">
        {items.length ? (
          <React.Fragment>
            <span className="col-11">Sub Total: {subTotal.toFixed(2)} $</span>
            <button className="btn btn-primary btn-sm col-1">check out</button>
          </React.Fragment>
        ) : (
          <Link to="/products" className="btn btn-link">
            Go back
          </Link>
        )}
      </p>
    </div>
  );
};
