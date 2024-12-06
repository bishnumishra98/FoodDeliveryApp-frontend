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
