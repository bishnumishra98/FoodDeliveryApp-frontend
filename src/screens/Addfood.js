import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFood } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

export default function Addfood() {
    const [name, setname] = useState("");
    const [size, setsize] = useState();
    const [price, setprice] = useState();
    const [category, setcategory] = useState("veg");
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");

    const dispatch = useDispatch();
    const addfoodstate = useSelector((state) => state.addFoodReducer);
    const { success, error, loading } = addfoodstate;

    function formHandler(e) {
        e.preventDefault();

        const food = {
            name,
            size,
            price,
            category,
            image,
            description,
        };

        console.log(food);
        dispatch(addFood(food));
    }

    return (
        <div>
            <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
                {loading && <Loading />}
                {error && <Error error="Something went wrong" />}
                {success && <Success success="New Food added successfully" />}

                <form onSubmit={formHandler}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Size"
                        value={size}
                        onChange={(e) => {
                            setsize(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => {
                            setprice(e.target.value);
                        }}
                    />

                    {/* Toggle Switch for Category */}
                    <div className="toggle-switch-container">
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="category-toggle"
                                checked={category === "nonveg"}
                                onChange={() => setcategory(category === "veg" ? "nonveg" : "veg")}
                            />
                            <label htmlFor="category-toggle" className="toggle-label">
                                <span className="toggle-slider"></span>
                                <span className="toggle-text">
                                    {category === "veg" ? "Veg" : "Non-veg"}
                                </span>
                            </label>
                        </div>
                    </div>

                    <input
                        className="form-control"
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => {
                            setimage(e.target.value);
                        }}
                    />
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => {
                            setdescription(e.target.value);
                        }}
                    />
                    <button className="btn add-food-btn mt-3" type="submit">
                        Add Food
                    </button>
                </form>
            </div>

            {/* Internal CSS for Toggle Switch */}
            <style jsx>{`
                .toggle-switch-container {
                    margin: 10px 0;
                    text-align: left;
                }

                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 120px;
                    height: 34px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .toggle-label {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #67a739;   /* Green for Veg */
                    border-radius: 34px;
                    transition: background-color 0.3s;
                }

                .toggle-label .toggle-slider {
                    position: absolute;
                    height: 28px;
                    width: 28px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    border-radius: 50%;
                    transition: transform 0.3s;
                }

                .toggle-switch input:checked + .toggle-label {
                    background-color: #b00a0a;   /* Red for Non-veg */
                }

                .toggle-switch input:checked + .toggle-label .toggle-slider {
                    transform: translateX(86px);
                }

                .toggle-label .toggle-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-70%, -50%);
                    font-size: 14px;
                    color: white;
                    font-weight: bold;
                }
                
                /* Styles for Add Food button */
                .add-food-btn {
                    background-color: #28a745 !important;
                    color: white !important;
                    transition: background-color 0.3s, box-shadow 0.3s !important;
                }

                .add-food-btn:hover {
                    background-color: #218838 !important;
                    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
