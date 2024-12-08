import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function Food({ food }) {
	const [quantity, setQuantity] = useState(1);
	const [show, setShow] = useState(false);

	const dispatch = useDispatch();

	// Add to Cart Handler
	const handleAddToCart = () => {
		dispatch(addToCart(food, quantity));
	};

	// Modal Handlers
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="food-card shadow-lg p-3 mb-5 bg-white rounded">
			<div className="food-header" onClick={handleShow}>
				<h1>{food.name}</h1>
				<img
					src={food.image}
					alt="food"
					className="food-image"
				/>
			</div>

			<div className="flex-container">
				<div className="m-1 w-100">
					<p>
						<strong>Serving size:</strong> <br />
						<span className="text-muted">{food.size}</span>
					</p>
				</div>
				<div className="m-1 w-100 quantity-control">
					<p>Quantity:</p>
					<div className="quantity-buttons">
						<button
							onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
							className="quantity-btn"
						>
							-
						</button>
						<span className="quantity-value">{quantity}</span>
						<button
							onClick={() => setQuantity((prev) => prev + 1)}
							className="quantity-btn"
						>
							+
						</button>
					</div>
				</div>
			</div>

			<div className="flex-container">
				<div className="m-1 w-100">
					<h5>
						<strong>Price:</strong> ₹{food.price * quantity}
					</h5>
				</div>
				<div className="m-1 w-100">
					<button
						className="add-to-cart-btn"
						onClick={handleAddToCart}
					>
						ADD TO CART
					</button>
				</div>
			</div>

			{/* Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{food.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<img
						src={food.image}
						alt="food"
						className="img-fluid"
					/>
					<p>{food.description}</p>
				</Modal.Body>
				<Modal.Footer>
					<button className="close-modal-btn" onClick={handleClose}>
						CLOSE
					</button>
				</Modal.Footer>
			</Modal>

			{/* Internal CSS */}
			<style> {`
				.food-card {
					text-align: center;
					border-radius: 10px;
				}
				.food-header img {
					height: 200px;
					width: 200px;
					cursor: pointer;
					transition: transform 0.3s;
				}
				.food-header img:hover {
					transform: scale(1.1);
				}
				.quantity-control {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.quantity-buttons {
					display: flex;
					align-items: center;
				}
				.quantity-btn {
					padding: 5px 10px;
					font-size: 18px;
					font-weight: bold;
					border: none;
					background: #f8f9fa;
					cursor: pointer;
					border-radius: 5px;
					color: #dc3545;
					transition: background-color 0.3s, color 0.3s;
				}
				.quantity-btn:hover {
					background-color: #dc3545;
					color: white;
				}
				.quantity-value {
					margin: 0 10px;
					font-size: 16px;
				}
				.add-to-cart-btn {
					background-color: #28a745;
					color: white;
					padding: 10px 20px;
					font-size: 16px;
					border: none;
					border-radius: 5px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					cursor: pointer;
					transition: background-color 0.3s, box-shadow 0.3s;
				}
				.add-to-cart-btn:hover {
					background-color: #218838;
					box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
				}
				.close-modal-btn {
					background-color: #dc3545;
					color: white;
					border: none;
					padding: 8px 20px;
					border-radius: 5px;
					cursor: pointer;
					transition: background-color 0.3s;
				}
				.close-modal-btn:hover {
					background-color: #c82333;
				}
			`} </style>
		</div>
	);
}
