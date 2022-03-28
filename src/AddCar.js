import React, { useState, useEffect } from "react";
import axios from "axios";
import Car from "./Car";

export default function AddCar() {
  const [cars, setCars] = useState([]);
  const deleteCar = (id) => {
    console.log(id);
    axios
      .delete(`/cars/${id}`)
      .then((res) => {
        if (res.data.error != null) {
          console.log(res.data.error);
          throw new Error(res.data.error);
        } else {
          loadCars();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  const clearAll = () => {
    axios
      .delete("/cars/delete/all")
      .then((res) => {
        if (res.data.error != null) {
          console.log(res.data.error);
          throw new Error(res.data.error);
        } else {
          loadCars();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const loadCars = () => {
    axios
      .get("/cars")
      .then((res) => {
        setCars(res.data.result);
      })
      .catch((error) => {
        console.log(error);
        alert("Error while loading cars");
      });
  };

  const addCar = (e) => {
    e.preventDefault();
    const form = e.target;
    axios
      .post("/cars", {
        id: form.id.value,
        name: form.name.value,
        price: form.price.value,
        color: form.color.value,
        in_stock: form.in_stock.value,
      })
      .then((res) => {
        if (res.data.error != null) {
          console.log(res.data.error);
          throw new Error(res.data.error);
        } else {
          loadCars();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div className='text-center'>
      <form className='form-container bg-light clearfix' onSubmit={addCar}>
        <h1 className='text-center mb-4'> Add Car</h1>
        <div className='forum-group text-center'>
          <input
            type='number'
            name='id'
            className='form-control'
            placeholder='Car ID'
          />
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Car Name'
          />
          <input
            type='number'
            name='price'
            className='form-control'
            placeholder='Car Price'
          />
          <select name='color' className='form-select'>
            <option value='Black'>Black</option>
            <option value='Blue'>Blue</option>
            <option value='Gray'>Gray</option>
          </select>
          <select name='in_stock' className='form-select'>
            <option value='1'>Yes</option>
            <option value='0'>NO</option>
          </select>
          <input type='submit' className='btn btn-success m-1' />
        </div>
      </form>
      <button className='btn btn-danger' onClick={clearAll}>
        Clear ALL
      </button>
      <div className='cars-list'>
        {cars.length > 0 ? (
          cars.map((car) => {
            return <Car key={car.id} car={car} delete={deleteCar} />;
          })
        ) : (
          <h1>No Cars Available</h1>
        )}
      </div>
    </div>
  );
}
