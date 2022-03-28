import React from "react";

export default function Car(props) {
  return (
    <div className='car-wrapper'>
      <h4>{`${props.car.id} - ${props.car.name}`}</h4>
      <h5>{`Price: ${props.car.price}`}</h5>
      <h5>{`Color: ${props.car.color}`}</h5>
      <h6>{`In Stock: ${props.car.in_stock === 1 ? "Yes" : "No"}`}</h6>
      <button
        className='btn btn-danger m-2'
        onClick={() => {
          props.delete(props.car.id);
        }}>
        Remove
      </button>
    </div>
  );
}
