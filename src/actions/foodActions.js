import axios from "axios";
import axiosInstance from "../utils/axiosConfig";
const reactappbackendurl = process.env.REACT_APP_BACKEND_URL;

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

// Get food by id (Authenticated API)
export const getFoodById = (foodId) => async (dispatch) => {
    dispatch({ type: "GET_FOODBYID_REQUEST" });

    try {
        const response = await axiosInstance.post(`/api/foods/getfoodbyid`, { foodId });
        console.log(response);
        dispatch({ type: "GET_FOODBYID_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_FOODBYID_FAILED", payload: error });
    }
};

// Add food (Authenticated API)
export const addFood = (food, imageFile) => async (dispatch) => {
    dispatch({ type: "ADD_FOOD_REQUEST" });
    const formData = new FormData();
    formData.append("food", JSON.stringify(food));
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(`/api/foods/addfood`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
        });
        console.log(response);
        dispatch({ type: "ADD_FOOD_SUCCESS" });

        // Wait for 2 seconds before redirecting
        await new Promise((resolve) => setTimeout(resolve, 2000));

        window.location.href = "/admin/addfood";
    } catch (error) {
        dispatch({ type: "ADD_FOOD_FAILED", payload: error });
    }
};

// Edit food (Authenticated API)
export const editFood = (editedFood, imageFile) => async (dispatch) => {
    dispatch({ type: "EDIT_FOOD_REQUEST" });
    const formData = new FormData();
    formData.append("food", JSON.stringify(editedFood));
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.put(`/api/foods/editfood`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
        console.log(response);
        dispatch({ type: "EDIT_FOOD_SUCCESS" });

		// Wait for 2 seconds before redirecting
        await new Promise((resolve) => setTimeout(resolve, 2000));

        window.location.href = "/";
    } catch (error) {
        console.error("Error editing food:", error);
        dispatch({ type: "EDIT_FOOD_FAILED", payload: error });
    }
};

// Delete food (Authenticated API)
export const deleteFood = (foodid) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/api/foods/deletefood`, { data: { foodid } });
        alert("Food deleted successfully");
        console.log(response);
        window.location.reload();
    } catch (error) {
        alert("Something went wrong");
        console.log(error);
    }
};
