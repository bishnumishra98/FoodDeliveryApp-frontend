import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from 'react-redux';

const Navbar = () => {
	const cartstate = useSelector(state => state.cartReducer);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg p-3 mb-5 bg-white rounded">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Food Delivery App</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{/* Add 'ms-auto' class to align nav items to the left */}
					<ul className="navbar-nav ms-auto">
					<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">Login</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/cart">Cart {cartstate.cartItems.length}</a>
					</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
