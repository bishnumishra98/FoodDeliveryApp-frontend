import axios from "axios";
import axiosInstance from "../utils/axiosConfig";
const reactappbackendurl = process.env.REACT_APP_BACKEND_URL;

// User Registration
export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    try {
        const response = await axios.post(`${reactappbackendurl}/api/users/register`, user);
        console.log(response);
        dispatch({ type: "USER_REGISTER_SUCCESS" });
    } catch (error) {
        dispatch({
            type: "USER_REGISTER_FAILED",
            payload: error.response?.data?.message || "Registration failed. Please try again.",
        });
    }
};

// User Login
export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    try {
        const response = await axios.post(`${reactappbackendurl}/api/users/login`, user);
        const { token, currentUser } = response.data;

        dispatch({ type: "USER_LOGIN_SUCCESS", payload: currentUser });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("authToken", token); // Save JWT token
        window.location.href = "/"; // Redirect to homepage
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAILED",
            payload: error.response?.data?.message || "Login failed. Please try again.",
        });
    }
};

// User Logout
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
};

// Get All Users (Authenticated API)
export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });

    try {
        const response = await axiosInstance.get(`/api/users/getallusers`);
        console.log(response);
        dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (error) {
        const errorMessage = error.response?.status === 401 
            ? "You are unauthorised" 
            : error.response?.data?.message || "Something went wrong";
        
        dispatch({
            type: "GET_USERS_FAILED",
            payload: errorMessage,
        });
    }
};

// Update User Status (Authenticated API)
export const updateUserStatus = (userId, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_USER_STATUS_REQUEST" });

        const response = await axiosInstance.put(`/api/users/updatestatus`, {
            userId,
            isAdmin,
        });

        console.log("User status updated:", response.data);

        dispatch({ type: "UPDATE_USER_STATUS_SUCCESS", payload: response.data });
        dispatch(getAllUsers()); // Refresh the users list
    } catch (error) {
        console.error("Error updating user status:", error);
        dispatch({
            type: "UPDATE_USER_STATUS_FAILED",
            payload: error.message,
        });
    }
};

// Delete User (Authenticated API)
export const deleteUser = (userid) => async (dispatch) => {
    try {
        await axiosInstance.post(`/api/users/deleteuser`, { userid });
        alert("User deleted successfully");
        window.location.reload();
    } catch (error) {
        alert("Something went wrong");
        console.log(error);
    }
};
