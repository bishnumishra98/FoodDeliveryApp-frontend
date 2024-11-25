import axios from "axios";

// 'getAllFoods' is the action name, while 'GET_FOODS_...' are the reducers.
export const getAllFoods = () => async (dispatch) => {
	dispatch({ type: "GET_FOODS_REQUEST" });

	try {
		const response = await axios.get("/api/foods/getallfoods");
		console.log(response);
		dispatch({ type: "GET_FOODS_SUCCESS", payload: response.data });
	} catch (error) {
		dispatch({ type: "GET_FOODS_FAILED", payload: error });
	}
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("currentUser");
	window.location.href = "/login";
};