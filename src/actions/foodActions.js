import axios from "axios";
const reactappbackendurl = process.env.REACT_APP_BACKEND_URL;

// 'getAllFoods' is the action name, while 'GET_FOODS_...' are the reducers.
export const getAllFoods = () => async (dispatch) => {
	dispatch({ type: "GET_FOODS_REQUEST" });

	try {
		const response = await axios.get(`${reactappbackendurl}/api/foods/getallfoods`);
		// console.log(response);
		dispatch({ type: "GET_FOODS_SUCCESS", payload: response.data });
	} catch (error) {
		dispatch({ type: "GET_FOODS_FAILED", payload: error });
	}
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("currentUser");
	window.location.href = "/login";
};

export const addFood = (food) => async dispatch => {
    dispatch({type:'ADD_FOOD_REQUEST'});
    try {
        const response= await axios.post('/api/foods/addfood' , {food});
        console.log(response);
        dispatch({type:'ADD_FOOD_SUCCESS'});
    } catch (error) {
        dispatch({type:'ADD_FOOD_FAILED' , payload : error});
    }
}

export const deleteFood = (foodid) => async dispatch => {
	try {
		const response =await axios.post('/api/foods/deletefood' , {foodid})
		alert('Food Deleted Successfully')
		console.log(response);
		window.location.reload();
	} catch (error) {
		alert('Something went wrong')
		console.log(error);
	}
}
