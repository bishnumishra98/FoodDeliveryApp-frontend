import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Userslist from './Userslist';
import Orderslist from './Orderslist';
import Foodslist from './Foodslist';
import Addfood from './Addfood';
import Editfood from './Editfood';

export default function Adminscreen() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    console.log(currentUser);
    
    const location = useLocation();   // get the current route

    useEffect(() => {
        if (!currentUser) {
            window.location.href = "/login";   // redirect if user is not logged in
        } else if (!currentUser.isAdmin) {
            window.location.href = "/";   // redirect if user is not an admin
        }
    }, [currentUser]);

    if (!currentUser) {
        return null;   // show nothing until user is validated
    }

    return (
        <div>
            <style>
                {`
                .admin-container {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .admin-title {
                    text-align: center;
                    font-size: 30px;
                    margin-bottom: 20px;
                }
                .adminfunctions {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    list-style: none;
                    padding: 6px 0;
                    margin: 0 auto 20px;
                    background-color: #414ace;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 75%;
                }
                .adminfunctions li {
                    padding: 5px 20px;
                    border-radius: 8px;
                    transition: background 0.3s, font-weight 0.3s, color 0.3s;
                }
                .adminfunctions li a {
                    color: white;
                    text-decoration: none;
                    font-size: 18px;
                    font-weight: 500;
                }
                .adminfunctions li.active {
                    background: #67a739;
                }
                .adminfunctions li.active a {
                    color: white;
                    font-weight: bold;
                }
                `}
            </style>
            <div className="admin-container">    
                <ul className="adminfunctions">
                    <li className={location.pathname === "/admin/userslist" ? "active" : ""}>
                        <Link to="userslist">Users List</Link>
                    </li>
                    <li className={location.pathname === "/admin/foodslist" ? "active" : ""}>
                        <Link to="foodslist">Food List</Link>
                    </li>
                    <li className={location.pathname === "/admin/addfood" ? "active" : ""}>
                        <Link to="addfood">Add Food</Link>
                    </li>
                    <li className={location.pathname === "/admin/orderslist" ? "active" : ""}>
                        <Link to="orderslist">Orders List</Link>
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
    );
}
