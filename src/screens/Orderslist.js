import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import io from "socket.io-client";

// Initialize the socket connection
const socket = io(process.env.REACT_APP_BACKEND_URL);

export default function Orderslist() {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.getAllOrdersReducer);
    const [liveOrders, setLiveOrders] = useState([]);

    // Fetch orders on component load
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    // Update local state when orders are fetched
    useEffect(() => {
        if (orders && Array.isArray(orders)) {
            setLiveOrders(orders);
        }
    }, [orders]);

    // Establish WebSocket connection for real-time updates
    useEffect(() => {
        socket.on("orderStatusUpdated", (updatedOrder) => {
            if (updatedOrder && updatedOrder.orderId) {
                setLiveOrders((prevOrders) => {
                    return prevOrders.map((order) => {
                        if (order._id === updatedOrder.orderId) {
                            // Forcefully replace only the status of the updated order
                            return { ...order, deliveryStatus: updatedOrder.newStatus };
                        }
                        return order;
                    });
                });
            }
        });

        return () => socket.disconnect();   // cleanup socket connection on unmount
    }, []);

    // Functions to convert UTC to IST date and time
    const getDate = (utcDateTime) => {
        const date = new Date(utcDateTime);
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + ISTOffset);
        return `${String(istDate.getUTCDate()).padStart(2, "0")}/${String(
            istDate.getUTCMonth() + 1
        ).padStart(2, "0")}/${istDate.getUTCFullYear()}`;
    };

    const getTime = (utcDateTime) => {
        const date = new Date(utcDateTime);
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + ISTOffset);
        return `${String(istDate.getUTCHours()).padStart(2, "0")}:${String(
            istDate.getUTCMinutes()
        ).padStart(2, "0")}:${String(istDate.getUTCSeconds()).padStart(2, "0")}`;
    };

    // Handler for delivery status change
    const handleStatusChange = (orderId, newStatus) => {
        dispatch(deliverOrder(orderId, newStatus)); // Dispatch the status change to the backend
        // Emit order status update to the server
        socket.emit("updateOrderStatus", { orderId, newStatus });

        // Update local state to reflect the status change immediately
        setLiveOrders((prevOrders) => {
            return prevOrders.map((order) => {
                if (order._id === orderId) {
                    // Update the delivery status immediately in the state
                    return { ...order, deliveryStatus: newStatus };
                }
                return order;
            });
        });
    };

    // Sort orders by createdAt (most recent first)
    const sortedOrders = liveOrders
        ? [...liveOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    return (
        <div>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            <table className="table table-striped table-bordered table-sm table-responsive">
                <thead className="thead-dark text-center" style={{ fontSize: "12px" }}>
                    <tr>
                        <th style={{ width: "8%" }}>Account Holder Name</th>
                        <th style={{ width: "8%" }}>Account Holder User ID</th>
                        <th style={{ width: "8%" }}>Order ID</th>
                        <th style={{ width: "15%" }}>Order Items</th>
                        <th style={{ width: "10%" }}>Customer Name</th>
                        <th style={{ width: "10%" }}>Customer Contact</th>
                        <th style={{ width: "12%" }}>Delivery Address</th>
                        <th style={{ width: "7%" }}>Amount</th>
                        <th style={{ width: "8%" }}>Date & Time</th>
                        <th style={{ width: "10%" }}>Delivery Status</th>
                    </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                    {sortedOrders.map((order) => {
                        if (!order || !order._id || !order.orderItems) return null; // Prevent rendering incomplete orders

                        return (
                            <tr key={order._id}>
                                <td className="text-center align-middle">{order.name}</td>
                                <td className="text-center align-middle" style={{ wordWrap: "break-word" }}>
                                    <div>{order.userid}</div>
                                </td>
                                <td className="text-center align-middle" style={{ wordWrap: "break-word" }}>
                                    <div>{order._id}</div>
                                </td>
                                <td>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <thead className="text-center">
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Size</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems.map((item, index) => (
                                                    <tr key={index} className="text-center">
                                                        <td>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                            />
                                                        </td>
                                                        <td className="align-middle">{item.name}</td>
                                                        <td className="align-middle">{item.size}</td>
                                                        <td className="align-middle">{item.quantity}</td>
                                                        <td className="align-middle">{item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                                <td className="text-center align-middle">{order.deliveryAddress.name}</td>
                                <td className="text-center align-middle">{order.deliveryAddress.contact}</td>
                                <td className="text-center align-middle">
                                    {`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`}
                                </td>
                                <td className="text-center align-middle">{order.orderAmount}</td>
                                <td className="text-center align-middle">
                                    <div>{getDate(order.createdAt)}</div>
                                    <div>{getTime(order.createdAt)}</div>
                                </td>
                                <td className="text-center align-middle">
                                    <select
                                        className="form-control"
                                        value={order.deliveryStatus || "orderplaced"}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        style={{ fontSize: "12px", width: "120px" }}
                                    >
                                        <option value="orderplaced">Order placed</option>
                                        <option value="orderaccepted">Order accepted</option>
                                        <option value="preparingorder">Preparing order</option>
                                        <option value="outfordelivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="orderrejected">Order rejected</option>
                                    </select>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
