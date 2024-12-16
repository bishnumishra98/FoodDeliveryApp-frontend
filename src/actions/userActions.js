import axios from "axios";
const reactappbackendurl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    try {
        const response = await axios.post(`${reactappbackendurl}/api/users/register`, user);
        console.log(response);
        dispatch({ type: "USER_REGISTER_SUCCESS" });
    } catch (error) {
        dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    try {
        const response = await axios.post(`${reactappbackendurl}/api/users/login`, user);
        console.log(response);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        window.location.href = "/"; // after successful login, direct the user to homepage
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    }
};

// When user logout, remove it from localstorage and direct them to login page.
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
};


export const getAllUsers = () => async dispatch => {
    dispatch({type:'GET_USERS_REQUEST'})

    try {
        const response = await axios.get(`${reactappbackendurl}/api/users/getallusers`);
        console.log(response);
        dispatch({type:'GET_USERS_SUCCESS' , payload : response.data});
       
    } catch (error) {
        dispatch({type:'GET_USERS_FAILED' , payload : error});
    }
}

export const updateUserStatus = (userId, isAdmin) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_USER_STATUS_REQUEST" });

        const response = await axios.put(`${reactappbackendurl}/api/users/updatestatus`, {
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

export const deleteUser = (userid) => async dispatch => {
    try {
        await axios.post(`${reactappbackendurl}/api/users/deleteuser`, {userid});
        alert("User deleted successfully");
        window.location.reload();
    } catch (error) {
        alert("Something went wrong");
        console.log(error);
    }
}
