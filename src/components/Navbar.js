import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/foodActions";

const Navbar = () => {
	const cartstate = useSelector((state) => state.cartReducer);
	const userstate = useSelector((state) => state.loginUserReducer);
	console.log(userstate);
	const { currentUser } = userstate;
	const dispatch = useDispatch();

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg p-2 mb-5 bg-white rounded" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
			<div className="container-fluid">
				<a className="navbar-brand" href="/">Food Delivery App</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{/* Add 'ms-auto' class to align nav items to the left */}
					<ul className="navbar-nav ms-auto">
						{currentUser ? (
						<div className="dropdown mt-2">
							<a
							className="dropdown-toggle"
							style={{ color: "black", textDecoration: "none" }}
							type="button"
							id="dropdownMenuButton"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							>
								{currentUser.name}
							</a>
							<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								<a className="dropdown-item" href="/orders">My orders</a>
								<a className="dropdown-item" href="#" onClick={() => {dispatch(logoutUser());}}><li>Logout</li></a>
							</div>
						</div>
						) : (
						<li className="nav-item">
							<a
							className="nav-link active"
							aria-current="page"
							href="/login"
							>
							Login
							</a>
						</li>
						)}

						<li className="nav-item">
							<a className="nav-link" href="/cart">
								Cart {cartstate.cartItems.length}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
