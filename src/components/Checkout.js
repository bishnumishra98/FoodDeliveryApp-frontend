import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function Checkout({ subtotal }) {
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.placeOrderReducer);
    const { loading, error, success } = orderState;

    const [showForm, setShowForm] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: "",
        contact: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrderClick = () => {
        setShowForm(true);
    };

    // Function to check if user is entering a valid phone number and pincode
    const validateInputs = () => {
        const phoneRegex = /^[0-9]{10}$/;   // 10-digit phone number
        const pincodeRegex = /^[0-9]{6}$/;   // 6-digit pincode
        if (!phoneRegex.test(deliveryAddress.contact)) {
            alert("Please enter a valid 10-digit contact number.");
            return false;
        }
        if (!pincodeRegex.test(deliveryAddress.pincode)) {
            alert("Please enter a valid 6-digit pincode.");
            return false;
        }
        return true;
    };
      
    const handlePayment = () => {
        if (validateInputs()) {
            console.log("subtotal:", subtotal);
            console.log("deliveryaddress:", deliveryAddress);
            dispatch(placeOrder(subtotal, deliveryAddress));
        }
    };
      

    return (
        <div>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            {success && <Success success="Order placed successfully" />}

            <style>
                {`
                    .checkout-container {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        padding-right: 20px;
                    }
                    .checkout-total {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .btn-primary-custom {
                        width: 200px;
                        padding: 12px;
                        font-size: 16px;
                        font-weight: bold;
                        color: #fff;
                        background-color: #007bff;
                        border: none;
                        border-radius: 50px;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        transition: all 0.3s ease;
                        text-align: center;
                        cursor: pointer;
                    }
                    .btn-primary-custom:hover {
                        background-color: #0056b3;
                        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
                        transform: translateY(-2px);
                    }
                    .btn-primary-custom:active {
                        transform: translateY(0);
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    }
                    .form-container {
                        max-width: 400px;
                        margin: 20px auto;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                        background: #fff;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                    }
                    .form-input:focus {
                        border-color: #007bff;
                        outline: none;
                        box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
                    }
                    .btn-success {
                        width: 100%;
                        padding: 12px;
                        font-size: 16px;
                        font-weight: bold;
                        color: #fff;
                        background-color: #28a745;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                    .btn-success:hover {
                        background-color: #218838;
                    }
                `}
            </style>

            {!showForm ? (
                <div className="checkout-container">
                <button
                    className="btn-primary-custom"
                    onClick={handlePlaceOrderClick}
                >
                    Place Order
                </button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Delivery address</h2>

                    <input
                        type="text"
                        placeholder="Customer Name"
                        name="name"
                        value={deliveryAddress.name}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Contact number"
                        name="contact"
                        value={deliveryAddress.contact}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        name="street"
                        value={deliveryAddress.street}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Pincode"
                        name="pincode"
                        value={deliveryAddress.pincode}
                        onChange={handleInputChange}
                        className="form-input"
                    />

                    <button className="btn-success" onClick={handlePayment}>
                        Continue order
                    </button>
                </div>
            )}
        </div>
    );
}
