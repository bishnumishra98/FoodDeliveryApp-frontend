import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { clearCart } from "../actions/cartActions";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

export default function Ordersscreen() {
    AOS.init();
    const dispatch = useDispatch();
    const location = useLocation();
    const orderstate = useSelector((state) => state.getUserOrdersReducer);
    const { orders, error, loading } = orderstate;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentSuccess = params.get("paymentSuccess");
        dispatch(getUserOrders());
        if (paymentSuccess) {
            dispatch(clearCart());
        }

        // Initialize socket connection
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL);

        // Listen for order updates
        socketConnection.on("orderStatusUpdated", (updatedOrder) => {
            // Update order status in the local state when it's updated
            dispatch(getUserOrders());
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socketConnection.disconnect();
        };
    }, [dispatch, location.search]);

    function getDate(utcDateTime) {
        const date = new Date(utcDateTime);
        const ISTOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
        const istDate = new Date(date.getTime() + ISTOffset);
        const day = String(istDate.getUTCDate()).padStart(2, "0");
        const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
        const year = istDate.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    const statusSteps = [
        "orderplaced",
        "orderaccepted",
        "preparingorder",
        "outfordelivery",
        "delivered",
    ];

    const statusLabels = {
        orderplaced: "Order Placed",
        orderaccepted: "Order Accepted",
        preparingorder: "Preparing Order",
        outfordelivery: "Out for Delivery",
        delivered: "Delivered",
        orderrejected: "Order Rejected",
    };

    const statusIcons = {
        orderplaced: <i className="fas fa-box"></i>,
        orderaccepted: <i className="fas fa-check-circle"></i>,
        preparingorder: <i className="fas fa-utensils"></i>,
        outfordelivery: <i className="fas fa-shipping-fast"></i>,
        delivered: <i className="fas fa-check-double"></i>,
        orderrejected: <i className="fas fa-times-circle"></i>,
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#ffffff" }}>
            <div className="row justify-content-center">
                {loading && <Loading />}
                {error && <Error error="Something went wrong" />}
                {orders && orders.length === 0 && (
                    <div style={{ textAlign: "center", color: "#666", fontSize: "18px", marginTop: "20px" }}>
                        There are no orders yet.
                    </div>
                )}
                {orders &&
                    orders.map((order) => {
                        const currentStatus = order.deliveryStatus;
                        const statusIndex = statusSteps.indexOf(currentStatus);

                        return (
                            <div
                                className="col-md-8 m-3"
                                data-aos="fade-down"
                                style={{
                                    backgroundColor: "#e3f7fd",
                                    color: "#333",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    padding: "20px",
                                    textAlign: "left",
                                }}
                                key={order._id}
                            >
                                <div className="flex-container" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="text-left w-100 mb-3" style={{ marginRight: "20px" }}>
                                        <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#007bff" }}>
                                            <strong>Items</strong>
                                        </h3>
                                        <hr style={{ borderColor: "#ddd" }} />
                                        {order.orderItems.map((item) => (
                                            <div style={{ marginBottom: "10px" }} key={item.name}>
                                                <p>
                                                    {item.name} &times; {item.quantity} ={" "}
                                                    <strong>&#8377;{item.price}</strong>
                                                </p>
                                            </div>
                                        ))}
                                        <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                                            Total: &#8377;{order.orderAmount}
                                        </p>
                                    </div>

                                    <div className="text-left w-100">
                                        <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#007bff" }}>
                                            <strong>Order details</strong>
                                        </h3>
                                        <hr style={{ borderColor: "#ddd" }} />
                                        <p>
                                            <strong>Order ID:</strong> {order._id}
                                        </p>
                                        <p>
                                            <strong>Date & time:</strong> {getDate(order.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div style={{ marginTop: "20px" }}>
                                    <h4 style={{ color: "#007bff", fontSize: "20px" }}>
                                        {" "}
                                        <strong>Order status</strong>{" "}
                                    </h4>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        {statusSteps.map((step, index) => {
                                            if (currentStatus === "orderrejected" && index > statusIndex) return null;

                                            return (
                                                <React.Fragment key={step}>
                                                    <div style={{ textAlign: "center", flex: 1 }}>
                                                        <div
                                                            style={{
                                                                height: "30px",
                                                                width: "30px",
                                                                borderRadius: "50%",
                                                                backgroundColor:
                                                                    index <= statusIndex
                                                                        ? currentStatus === "orderrejected"
                                                                            ? "#dc3545"
                                                                            : "#28a745"
                                                                        : "#ddd",
                                                                color: "#fff",
                                                                margin: "0 auto",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            {statusIcons[step]}
                                                        </div>
                                                        <p style={{ fontSize: "12px", marginTop: "5px", color: "#333" }}>
                                                            {statusLabels[step]}
                                                        </p>
                                                    </div>
                                                    {index < statusSteps.length - 1 && (
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                                height: "5px",
                                                                backgroundColor:
                                                                    index < statusIndex ? "#28a745" : "#ddd",
                                                            }}
                                                        ></div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}

                                        {currentStatus === "orderrejected" && (
                                            <div style={{ textAlign: "center", flex: 1 }}>
                                                <div
                                                    style={{
                                                        height: "30px",
                                                        width: "30px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#dc3545",
                                                        color: "#fff",
                                                        margin: "0 auto",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {statusIcons.orderrejected}
                                                </div>
                                                <p style={{ fontSize: "12px", marginTop: "5px", color: "#dc3545" }}>
                                                    {statusLabels.orderrejected}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
