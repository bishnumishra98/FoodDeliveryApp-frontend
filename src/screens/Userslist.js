import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { deleteUser, getAllUsers, updateUserStatus } from "../actions/userActions";

export default function Userslist() {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.getAllUsersReducer);
    const { error, loading, users } = usersState;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, isAdmin) => {
        // Dispatch an action to update the user status
        const updatedStatus = !isAdmin; // Toggle the current isAdmin value
        dispatch(updateUserStatus(userId, updatedStatus));
    };

    const confirmDeleteUser = (userId) => {
        const confirmMessage = "Are you sure you want to delete this user? This action cannot be undone.";
        if (window.confirm(confirmMessage)) {
            dispatch(deleteUser(userId));
        }
    };

    // Sort users by createdAt in descending order (most recent first)
    const sortedUsers = [...users].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div>
            <h1>Users List</h1>
            {loading && <Loading />}
            {error && <Error error="Something went wrong" />}
            <table className="table table-striped table-bordered table-responsive-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Authority</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedUsers &&
                        sortedUsers.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            className="form-control"
                                            value={user.isAdmin ? "Admin" : "Non-Admin"}
                                            onChange={() => handleRoleChange(user._id, user.isAdmin)}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Non-Admin">Non-Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <i
                                            className="fa fa-trash trash-icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => confirmDeleteUser(user._id)}
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            {/* Inline CSS for the trash-icon button and hover effect */}
            <style>{`
            .trash-icon {
                font-size: 18px;
                color: red;
                cursor: pointer;
                transition: transform 0.2s ease, color 0.2s ease;
            }

            .trash-icon:hover {
                color: darkred;
                transform: scale(1.2);
            }
            `}</style>
        </div>
    );
}
