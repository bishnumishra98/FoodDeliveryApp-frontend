import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFood, getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function Foodslist() {
    const dispatch = useDispatch();
    const foodsstate = useSelector((state) => state.getAllFoodsReducer);
    const { foods, error, loading } = foodsstate;

    useEffect(() => {
        dispatch(getAllFoods());
    }, [dispatch]);

    // Function to handle food deletion with confirmation prompt
    const handleDeleteFood = (foodId) => {
        const confirmation = window.confirm("Are you sure you want to delete this food item? This action cannot be undone.");
        if (confirmation) {
            dispatch(deleteFood(foodId));
        }
    };

    return (
        <div>
            <style>{`
                .icon-hover {
                    transition: transform 0.2s ease, color 0.2s ease;
                    cursor: pointer;
                }

                .icon-hover:hover {
                    transform: scale(1.2);
                    color: darkred;
                }

                .fa-edit:hover {
                    color: darkblue;
                }
            `}</style>

            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}

            <table className="table table-bordered table-responsive-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Serving size</th>
                        <th>Price(₹)</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foods &&
                        foods.map((food) => (
                            <tr key={food._id}>
                                <td>{food.name}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>{food.category === "veg" ? "Veg" : "Non-veg"}</td>
                                <td>
                                    <img
                                        src={food.image}
                                        alt="food"
                                        style={{ height: "80px", width: "80px" }}
                                    />
                                </td>
                                <td>
                                    {/* Confirmation prompt before delete */}
                                    <i
                                        className="fa fa-trash m-1 icon-hover"
                                        onClick={() => handleDeleteFood(food._id)}
                                    ></i>
                                    <Link to={`/admin/editfood/${food._id}`}>
                                        <i className="fa fa-edit m-1 icon-hover"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
