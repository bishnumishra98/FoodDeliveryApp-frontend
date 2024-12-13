import axios from "axios";
const reactappbackendurl = process.env.REACT_APP_BACKEND_URL;

export const placeOrder = (subtotal, deliveryAddress) => async (dispatch, getState) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        // API call to initiate the order and get the payment URL
        const response = await axios.post(`${reactappbackendurl}/api/orders/placeorder`, {
            currentUser,
            cartItems,
            subtotal,
            deliveryAddress,
        });

        // If initiate payment request to PhonePe is successful, then redirect to PhonePe's payment page url which we get in response
        if (response.data.success) {            
            window.location.href = response.data.data.instrumentResponse.redirectInfo.url;   // Redirect to PhonePe's payment page
        } else {
            dispatch({ type: "PLACE_ORDER_FAILED" });
            console.log("Payment URL not received in response.");
        }
    } catch (error) {
        dispatch({ type: "PLACE_ORDER_FAILED" });
        console.log(error);
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;
    dispatch({ type: "GET_USER_ORDERS_REQUEST" });

    try {
        const response = await axios.post(`${reactappbackendurl}/api/orders/getuserorders`, { userid: currentUser._id });
        console.log(response);
        dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
    }
};

export const getAllOrders = () => async (dispatch, getState) => {
    // const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: "GET_ALLORDERS_REQUEST" });

    try {
        const response = await axios.get(`${reactappbackendurl}/api/orders/getallorders`);
        console.log(response);
        dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_ALLORDERS_FAILED", payload: error });
    }
};

export const deliverOrder = (orderid, status) => async (dispatch) => {
    try {
        // Send updated delivery status along with order ID to the backend
        const response = await axios.post(`${reactappbackendurl}/api/orders/deliverorder`, { orderid, status });
        console.log(response);

        // alert(`Order status updated to: ${status}`);

        // Fetch the updated orders list after status change
        const orders = await axios.get(`${reactappbackendurl}/api/orders/getallorders`);
        dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: orders.data });
    } catch (error) {
        console.error("Error while updating order status:", error);
        alert("Failed to update order status. Please try again.");
    }
};
