import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCart(props) {
  const navigate = useNavigate();
  return (
    <div
      className="card m-2 cursor-pointer"
      style={{ backgroundColor: "#E7E8D1", width: 300 }}
      role="button" onClick={() => navigate(`/product/${props.id}`)}
    >
      <div className="mt-3">
        <img
          src={props.thumbnail}
          height={150}
          width={180}
          alt={props.title}
          className="border-radius-9"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="mt-3" style={{ color: "blue" }}>
          price:{`$${props.price}`}
        </h6>
        <h6 className="mt-2">Discount:{props.discountPercentage}%</h6>
        <h6 className="mt-2">Rating:{props.rating}</h6>
        <div className="mt-4">
          {props.stock > 0 ? (
            <button className="btn btn-success">Available</button>
          ) : (
            <button className="btn btn-outline-danger">Out Of Stock</button>
          )}
        </div>
      </div>
    </div>
  );
}
