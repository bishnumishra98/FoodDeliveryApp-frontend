import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/foodActions";

const Navbar = () => {
    const cartstate = useSelector((state) => state.cartReducer);
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch();

    return (
        <nav
            className="navbar navbar-expand-lg bg-body-tertiary shadow-lg p-2 mb-5 bg-white rounded"
            style={{ position: "sticky", top: 0, zIndex: 1000 }}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Food Delivery App
                </a>
                <div className="notice" style={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px", color: "#2F4F4F" }}>
                    <p style={{ textAlign: "left" }}>
                        <span style={{ fontWeight: "bold" }}>Note:</span> The backend is deployed on a free instance of{" "}
                        <a
                        href="https://render.com/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        style={{ color: "#2F4F4F" }}
                        >
                        Render
                        </a>
                        , resulting in an initial response time of 30-60 seconds for the first time this app wakes up after a prolonged idle period. By that time, you may go through the{" "}
                        <a
                        href="https://drive.google.com/file/d/1hZXEbSJOgbTGIn-PQPyPsf5zb63hGvsk/view"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        style={{ color: "#2F4F4F" }}
                        >
                        Illustration video
                        </a>
                        . Thank you for your understanding🙃.
                    </p>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" style={{marginRight: "60px"}}>
                    <ul className="navbar-nav ms-auto">
                        {currentUser ? (
                            <div className="dropdown mt-2">
                                <a
                                    className="dropdown-toggle"
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {currentUser.name ? currentUser.name.split(" ")[0] : "User"}
                                </a>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="/orders">
                                        My orders
                                    </a>
                                    {currentUser.isAdmin && (
                                        <a className="dropdown-item" href="/admin">
                                            Admin panel
                                        </a>
                                    )}
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() => {
                                            dispatch(logoutUser());
                                        }}
                                    >
                                        Logout
                                    </a>
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
                            <a
                                className="nav-link"
                                href="/cart"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <i
                                    className="fas fa-shopping-cart"
                                    style={{
                                        fontSize: "20px",
                                        marginRight: "8px",
                                        marginTop: "4px",
                                    }}
                                ></i>
                                {cartstate.cartItems.length > 0 && (
                                    <span
                                        style={{
                                            background: "red",
                                            color: "white",
                                            borderRadius: "50%",
                                            padding: "3px 8px",
                                            fontSize: "12px",
                                        }}
                                    >
                                        {cartstate.cartItems.length}
                                    </span>
                                )}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
