import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Food from "../components/Food";
import { getAllFoods } from "../actions/foodActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Homescreen() {
    const dispatch = useDispatch();

    const foodsstate = useSelector((state) => state.getAllFoodsReducer);
    const { foods, error, loading } = foodsstate;

    // State for Veg toggle
    const [showVegOnly, setShowVegOnly] = useState(false);

    useEffect(() => {
        dispatch(getAllFoods());
    }, [dispatch]);

    // Filtered foods based on Veg toggle
    const filteredFoods = showVegOnly
        ? foods.filter((food) => food.category === "veg")
        : foods;

    return (
        <div>
            {/* Toggle Switch */}
            <div className="toggle-switch-container mb-3">
                <label className="switch-label">
                    <input
                        type="checkbox"
                        checked={showVegOnly}
                        onChange={() => setShowVegOnly(!showVegOnly)}
                    />
                    <span className="slider"></span>
                </label>
                <span className="toggle-text">
                    {showVegOnly ? "Veg only" : "Veg only"}
                </span>
            </div>

            {/* Food Cards */}
            <div className="row justify-content-center">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error="Something went wrong" />
                ) : (
                    filteredFoods.map((food) => (
                        <div className="col-md-3 m-3" key={food._id}>
                            <Food food={food} />
                        </div>
                    ))
                )}
            </div>

            {/* Internal CSS */}
            <style>
                {`
                /* Toggle Switch Container */
                .toggle-switch-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 10px 0;
                }

                /* Switch Label (Background) */
                .switch-label {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 30px;
                    margin-right: 10px;
                }

                /* Hide Default Checkbox */
                .switch-label input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                /* Slider (Switch Knob) */
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc; /* Default grey */
                    transition: 0.4s;
                    border-radius: 30px;
                }

                /* Switch Circle */
                .slider::before {
                    content: "";
                    position: absolute;
                    height: 24px;
                    width: 24px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: 0.4s;
                    border-radius: 50%;
                }

                /* Checked State */
                .switch-label input:checked + .slider {
                    background-color: #28a745; /* Green */
                }

                .switch-label input:checked + .slider::before {
                    transform: translateX(30px);
                }

                /* Toggle Text */
                .toggle-text {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                }
            `}
            </style>
        </div>
    );
}
