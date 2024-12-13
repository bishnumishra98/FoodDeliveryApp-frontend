import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import Userslist from './Userslist';
import Orderslist from './Orderslist';
import Foodslist from './Foodslist';
import Addfood from './Addfood';
import Editfood from './Editfood';

export default function Adminscreen() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;

    useEffect(() => {
        if (!currentUser) {
            window.location.href = "/login"; // Redirect if user is not logged in
        } else if (!currentUser.isAdmin) {
            window.location.href = "/"; // Redirect if user is not an admin
        }
    }, [currentUser]);

    if (!currentUser) {
        return null; // Show nothing until user is validated
    }

    return (
        <div>
            <div className="row justify-content-center p-3">
                <div className="col-md-10">
                    <h2 style={{ fontSize: "35px" }}>Admin Panel</h2>
                    <ul className="adminfunctions">
                        <li>
                            <Link to="userslist" style={{ color: 'white' }}>Users List</Link>
                        </li>
                        <li>
                            <Link to="foodslist" style={{ color: 'white' }}>Food List</Link>
                        </li>
                        <li>
                            <Link to="addfood" style={{ color: 'white' }}>Add Food</Link>
                        </li>
                        <li>
                            <Link to="orderslist" style={{ color: 'white' }}>Orders List</Link>
                        </li>
                    </ul>

                    {/* Define sub-routes */}
                    <Routes>
                        <Route path="/" element={<Navigate to="userslist" />} />
                        <Route path="userslist" element={<Userslist />} />
                        <Route path="orderslist" element={<Orderslist />} />
                        <Route path="foodslist" element={<Foodslist />} />
                        <Route path="addfood" element={<Addfood />} />
                        <Route path="editfood/:foodid" element={<Editfood />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
