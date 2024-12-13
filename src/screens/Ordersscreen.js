import React , { useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getUserOrders } from '../actions/orderActions';
import Error from "../components/Error";
import Loading from "../components/Loading";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { clearCart } from '../actions/cartActions';
import { useLocation } from "react-router-dom";

export default function Ordersscreen() {
    AOS.init();
    const dispatch = useDispatch();
    const location = useLocation();
    const orderstate = useSelector(state => state.getUserOrdersReducer);
    const {orders , error , loading} = orderstate;

    function getDate(utcDateTime) {
        // Parse the input UTC date-time string into a Date object
        const date = new Date(utcDateTime);
      
        // Add IST offset (+5:30)
        const istDate = new Date(date.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
      
        // Extract day, month, and year in IST
        const day = String(istDate.getDate()).padStart(2, '0');
        const month = String(istDate.getMonth() + 1).padStart(2, '0');   // months are 0-based
        const year = istDate.getFullYear();
      
        // Return the date in DD/MM/YYYY format
        return `${day}/${month}/${year}`;
    }
      
    function getTime(utcDateTime) {
        // Ensure the input date-time string is parsed as UTC
        const date = new Date(utcDateTime);
    
        // Add IST offset (+5:30)
        const ISTOffset = (5 * 60 * 60 * 1000) + (30 * 60 * 1000);   // offset in milliseconds
        const istDate = new Date(date.getTime() + ISTOffset);
    
        // Extract hours, minutes, and seconds in IST
        const hours = String(istDate.getUTCHours()).padStart(2, '0');   // use UTC Hours
        const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');
    
        // Return the time in HH:MM:SS format
        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log("params", params);
        
        const paymentSuccess = params.get("paymentSuccess");
        console.log("paymentSuccess", paymentSuccess);
        
        // Fetch user orders
        dispatch(getUserOrders());

        if (paymentSuccess) {
            dispatch(clearCart());
            // console.log("cart cleared");
        }
    }, [])

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff' }}>
            <div className="row justify-content-center">
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {orders && orders.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '20px' }}>
                        There are no orders yet.
                    </div>
                )}
                {orders && orders.map(order => (
                    <div className="col-md-8 m-3" data-aos='fade-down' style={{ backgroundColor: '#e3f7fd', color: '#333', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', textAlign: 'left' }} key={order._id}>
                        <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='text-left w-100 mb-3' style={{ marginRight: '20px' }}>
                                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#007bff' }}><strong>Items</strong></h3>
                                <hr style={{ borderColor: '#ddd' }} />
                                {order.orderItems.map(item => (
                                    <div style={{ marginBottom: '10px' }} key={item.name}>
                                        <p>{item.name} &times; {item.quantity} = <strong>&#8377;{item.price}</strong></p>
                                    </div>
                                ))}
                                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Total: &#8377;{order.orderAmount}</p>
                            </div>
                            <div className='text-left w-100 mb-3' style={{ marginRight: '20px' }}>
                                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#007bff' }}><strong>Delivery address</strong></h3>
                                <hr style={{ borderColor: '#ddd' }} />
                                <p>{order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}</p>
                            </div>
                            <div className='text-left w-100'>
                                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#007bff' }}><strong>Order details</strong></h3>
                                <hr style={{ borderColor: '#ddd' }} />
                                <p><strong>Customer name:</strong> {order.deliveryAddress.name}</p>
                                <p><strong>Contact number:</strong> {order.deliveryAddress.contact}</p>
                                <p><strong>Date & time:</strong> {getDate(order.createdAt)} & {getTime(order.createdAt)}</p>
                                <p><strong>Order ID:</strong> {order._id}</p>
                                <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
