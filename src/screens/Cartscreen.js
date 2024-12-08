import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';

export default function Cartscreen() {
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    var total = cartItems.reduce((x, item) => x + item.price * item.quantity, 0);
    const dispatch = useDispatch();

    return (
        <div>
            <div className='row justify-content-center'>
                <div className="col-md-6">
                    <h2 style={{ fontSize: '40px' }}>My Cart</h2>
                    {total <= 0 && <h4 style={{ color: "darkgray" }}>Your Cart is empty</h4>}
                    {cartItems.map(item => {
                        return (
                            <div className="flex-container" key={item._id}>
                                <div className='text-start m-1 w-100'>
                                    <h1>{item.name} [{item.variant}]</h1>
                                    <h1>Price: {item.quantity} &times; ₹{item.price} = ₹{item.quantity * item.price}</h1>
                                    <h1 style={{ display: 'inline' }}>Quantity: </h1>
                                    <i
                                        className="fa-solid fa-minus"
                                        onClick={() => { dispatch(addToCart(item, item.quantity - 1)) }}
                                    ></i>
                                    <b>{item.quantity}</b>
                                    <i
                                        className="fa-solid fa-plus"
                                        onClick={() => { dispatch(addToCart(item, item.quantity + 1)) }}
                                    ></i>
                                    <hr />
                                </div>
                                <div className='m-1 w-100'>
                                    <img
                                        src={item.image}
                                        alt="item-image"
                                        style={{ height: '80px', width: '80px' }}
                                    />
                                </div>
                                <div className='m-1 w-100'>
                                    <i
                                        className="fa-solid fa-trash mt-4 trash-icon"
                                        onClick={() => { dispatch(deleteFromCart(item)) }}
                                    ></i>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Only show this block when something is added to the cart */}
                {total > 0 && (
                    <div className="col-md-4 text-end">
                        <h2 style={{ fontSize: '35px', fontWeight: 'bold' }}>Total: ₹{total}</h2>
                        <Checkout subtotal={total} />
                    </div>
                )}
            </div>

            {/* Inline CSS for the hover effect */}
            <style>{`
                .trash-icon {
                    font-size: 18px;
                    color: red;
                    cursor: pointer;
                    transition: transform 0.2s ease, color 0.2s ease;
                }

                .trash-icon:hover {
                    color: darkred;
                    transform: scale(1.2); /* Slightly larger on hover */
                }
            `}</style>
        </div>
    );
}
