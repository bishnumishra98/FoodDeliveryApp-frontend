import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFood, getFoodById } from "../actions/foodActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { useParams } from "react-router-dom";

export default function Editfood() {
    const { foodid } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("veg");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [description, setDescription] = useState("");

    const getfoodbyidstate = useSelector((state) => state.getFoodByIdReducer);
    const { food, error, loading } = getfoodbyidstate;

    const editfoodstate = useSelector((state) => state.editFoodReducer);
    const { editloading, editerror, editsuccess } = editfoodstate;

    useEffect(() => {
        if (food) {
            if (food._id === foodid) {   // use foodid from useParams here
                setName(food.name);
                setSize(food.size);
                setPrice(food.price);
                setCategory(food.category);
                setImage(food.image);
                setImageName(food.image_name);
                setDescription(food.description);
            } else {
                dispatch(getFoodById(foodid));   // fetch food data using foodid
            }
        } else {
            dispatch(getFoodById(foodid));
        }
    }, [food, dispatch, foodid]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
        }
    };

    function formHandler(e) {
        e.preventDefault();

        const editedFood = {
            _id: foodid,
            name,
            size,
            price,
            category,
            description,
        };

        dispatch(editFood(editedFood, image));
    }

    return (
        <div>
            <div className="text-left shadow-lg p-3 mb-5 bg-white rounded" style={{ width: "480px" }}>
                <h1>Edit Food</h1>
                {loading && <Loading />}
                {error && <Error error="Something went wrong" />}
                {editsuccess && <Success success="Food details edited successfully" />}
                {editloading && <Loading />}

                <form onSubmit={formHandler}>
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Name of the food item"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Serving size (half plate/full plate/small/medium/large/etc.)"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Price (₹)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    {/* Toggle Switch for Category */}
                    <div className="toggle-switch-container mb-3">
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="category-toggle"
                                checked={category === "nonveg"}
                                onChange={() =>
                                    setCategory(category === "veg" ? "nonveg" : "veg")
                                }
                            />
                            <label htmlFor="category-toggle" className="toggle-label">
                                <span className="toggle-slider"></span>
                                <span className="toggle-text">
                                    {category === "veg" ? "Veg" : "Non-veg"}
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* File input for image upload */}
                    <div className="custom-file-input mb-3">
                        <label htmlFor="file-upload" className="upload-label">
                            Upload food image
                        </label>
                        <input
                            id="file-upload"
                            className="form-control file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {imageName && <p className="file-name">{imageName}</p>}
                        
                        <style jsx>{`
                            .custom-file-input {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                align-items: flex-start;
                            }

                            .file-input {
                                opacity: 0;
                                position: absolute;
                                z-index: -1;
                            }

                            .upload-label {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #007bff;
                                color: white;
                                font-size: 14px;
                                font-weight: bold;
                                border-radius: 4px;
                                cursor: pointer;
                                transition: background-color 0.3s ease;
                                text-align: left;
                            }

                            .upload-label:hover {
                                background-color: #0056b3;
                            }

                            .file-name {
                                margin-top: 10px;
                                font-size: 14px;
                                color: #555;
                            }
                        `}</style>
                    </div>
                    <textarea
                        className="form-control mb-3"
                        rows="6"
                        placeholder="Food description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <button className="btn add-food-btn mt-3" type="submit">
                        Edit Food
                    </button>
                </form>
            </div>

            {/* Internal CSS */}
            <style jsx>{`
                /* Styles for Toggle switch */
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
                    background-color: #67a739; /* Green for Veg */
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
                    background-color: #b00a0a; /* Red for Non-veg */
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
                    background-color: #007bff !important;
                    color: white !important;
                    transition: background-color 0.3s, box-shadow 0.3s !important;
                    font-weight: bold;
                }

                .add-food-btn:hover {
                    background-color: #0056b3 !important;
                    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
