import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function Pizza({pizza}) {
    const [quantity , setquantity] = useState(1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    function addtocart() {
        dispatch(addToCart(pizza, quantity));
    }

    return (
        <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            <div onClick={handleShow}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} alt="pizza-image" style={{height:'200px', width:'200px'}}/>
            </div>

            <div className="flex-container">
                <div className='w-100 m-1'>
                    <p className='mt-1'>Serving size: <br/> <span style={{color: 'grey'}}>{pizza.size}</span></p>
                </div>

                <div className='w-100 m-1' style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <p style={{marginRight: '10px', marginBottom: '0'}}>Quantity</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <button 
                            onClick={() => setquantity(prev => prev > 1 ? prev - 1 : 1)} 
                            className="quantity-btn"
                        >
                            -
                        </button>
                        <span style={{ margin: '0 10px', fontSize: '16px' }}>{quantity}</span>
                        <button 
                            onClick={() => setquantity(prev => prev + 1)} 
                            className="quantity-btn"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-container">
                <div className='m-1 w-100'>
                    <h5 className='mt-1'>Price: <span style={{color: '#555555'}}>₹{pizza.price * quantity}</span></h5>
                </div>
                <div className='m-1 w-100'>
                    <button className="btn" onClick={addtocart} style={{ fontSize: '15px', padding: '5px 15px' }}>ADD TO CART</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={pizza.image} alt="pizza-image" className='img-fluid' style={{height: '400px'}}/>
                    <p>{pizza.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn' onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>

            {/* Internal CSS for - + buttons */}
            <style jsx>{`
                .quantity-btn {
                    padding: 3px 3px;
                    font-size: 20px;
                    cursor: pointer;
                    background-color: transparent;
                    border: none;
                    color: #e91e63;
                    font-weight: bold;
                }
                .quantity-btn:hover {
                    color: #0056b3;
                }
            `}</style>
        </div>
    )
}
