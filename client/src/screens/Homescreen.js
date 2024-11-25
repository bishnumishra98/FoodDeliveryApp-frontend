import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import foods from '../fooddata'   // no more needed data from local file
import Food from "../components/Food";
import { getAllFoods } from "../actions/foodActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Homescreen() {
  const dispatch = useDispatch();

  const foodsstate = useSelector((state) => state.getAllFoodsReducer); // is used to pull the foods data from the Redux store (getAllFoodsReducer)
  const { foods, error, loading } = foodsstate;

  useEffect(() => {
    dispatch(getAllFoods());
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : (
          foods.map((food) => {
            return (
              <div className="col-md-3 m-3" key={food._id}>
                <Food food={food} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
