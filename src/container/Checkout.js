import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import { useNavigate, useParams } from "react-router-dom";
import { ProductList } from "../data/ProductList";

export default function Checkout() {
  const params = useParams();
  const list = useSelector((state) => state.cart.list);

  const [state, setState] = useState(
    params.id
      ? [
          {
            ...ProductList.find(
              (element) => element.id === parseInt(params.id)
            ),
            count: 1,
          },
        ]
      : list
  );
  const navigate = useNavigate();

  const incrementItem = (item) => {
    const index = state.findIndex((product) => product.id === item.id);

    setState((state) => [
      ...state.slice(0, index),
      { ...item, count: item.count + 1 },
      ...state.slice(index + 1),
    ]);
  };

  const decrementItem = (item) => {
    if (item.count === 1) {
      removeItemFromCart(item);
    } else {
      const index = state.findIndex((product) => product.id === item.id);
      setState((state) => [
        ...state.slice(0, index),
        { ...item, count: item.count - 1 }, // Fixed the count decrement here
        ...state.slice(index + 1),
      ]);
    }
  };

  const removeItemFromCart = (item) => {
    const index = state.findIndex((product) => product.id === item.id);
    setState((state) => [...state.slice(0, index), ...state.slice(index + 1)]);
  };

  return (
    <>
      {state.length > 0 ? (
        <>
          {state.map((item) => (
            <ProductListItem
              {...item}
              key={item.id}
              incrementItem={() => incrementItem(item)}
              decrementItem={() => decrementItem(item)}
              removeItem={() => removeItemFromCart(item)}
            />
          ))}
          <button
            className="btn btn-success"
            onClick={() => navigate("/success")}
            style={{ backgroundColor: "yellowgreen" }}
          >
            Place order
          </button>
          <div className="row">
            <div className="btn-group">
              <div className="col-md-1"></div>
              <div className="dropdown">
                <button type="button" className="btn btn-outline-danger">
                  Cash on Delivery
                </button>
                <label className="container-flex p-4">
                  <input type="radio" name="paymentMethod" required/>
                  <span className="checkmark"></span>
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="btn-group">
              <div className="col-md-1"></div>
              <div className="dropdown">
                <button type="button" className="btn btn-outline-danger">
                  online payment{" "}
                </button>
                <label className="container-flex p-4">
                  <input type="radio" name="paymentMethod" required />
                  <span className="checkmark"></span>
                    Online payment
                </label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3>No items in the checkout</h3>
      )}
    </>
  );
}
