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

    // States for Veg toggle and search input
    const [showVegOnly, setShowVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getAllFoods());
    }, [dispatch]);

    // Filter foods based on Veg toggle and search term
    const filteredFoods = foods
        .filter((food) => (showVegOnly ? food.category === "veg" : true))
        .filter((food) =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            {/* Search Bar and Toggle Switch */}
            <div className="search-toggle-container mb-3">
                {/* Search Bar */}
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for food..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Veg Only Toggle Switch */}
                <div className="toggle-switch-container">
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
            </div>

            {/* Food Cards */}
            <div className="row justify-content-center">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error="Something went wrong" />
                ) : filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <div className="col-md-3 m-3" key={food._id}>
                            <Food food={food} />
                        </div>
                    ))
                ) : (
                    <p className="no-results">No food items match your search.</p>
                )}
            </div>

            {/* Internal CSS */}
            <style>
                {`
                /* Container for search and toggle switch */
                .search-toggle-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 10px auto;
                    max-width: 600px;
                }

                /* Search Bar */
                .search-bar {
                    flex: 1;
                    padding: 8px 12px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    outline: none;
                    transition: border-color 0.3s;
                }

                .search-bar:focus {
                    border-color: #28a745; /* Green border on focus */
                }

                /* Toggle Switch Container */
                .toggle-switch-container {
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
					margin-top: 10px;
                }

                .switch-label {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 30px;
                    margin-right: 10px;
                }

                .switch-label input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: 0.4s;
                    border-radius: 30px;
                }

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

                .switch-label input:checked + .slider {
                    background-color: #28a745; /* Green */
                }

                .switch-label input:checked + .slider::before {
                    transform: translateX(30px);
                }

                .toggle-text {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                }

                /* No results message */
                .no-results {
                    font-size: 18px;
                    color: #666;
                    text-align: center;
                    margin-top: 20px;
                }
            `}
            </style>
        </div>
    );
}
