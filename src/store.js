import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { getAllFoodsReducer, addFoodReducer, getFoodByIdReducer, editFoodReducer } from "./reducers/foodReducers";
import { cartReducer } from "./reducers/cartReducers";
import { getAllUsersReducer, loginUserReducer, registerUserReducer } from "./reducers/userReducers";
import { placeOrderReducer, getUserOrdersReducer, getAllOrdersReducer } from "./reducers/orderReducers";

const finalReducer = combineReducers({
	getAllFoodsReducer: getAllFoodsReducer,
	cartReducer: cartReducer,
	registerUserReducer: registerUserReducer,
	loginUserReducer: loginUserReducer,
	placeOrderReducer: placeOrderReducer,
	getUserOrdersReducer: getUserOrdersReducer,
	addFoodReducer: addFoodReducer,
	getFoodByIdReducer: getFoodByIdReducer,
	editFoodReducer: editFoodReducer,
	getAllOrdersReducer: getAllOrdersReducer,
	getAllUsersReducer: getAllUsersReducer,
});

// If there is any item with the name 'cartItems' in the local storage, first we have to convert it to JSON object, then assign it to the store.
const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

const initialState = {
	cartReducer: {
		cartItems: cartItems,
	},
	loginUserReducer: {
		currentUser: currentUser,
	},
};

const store = configureStore({
	reducer: finalReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
	devTools: process.env.NODE_ENV !== "production",   // DevTools will be enabled in development mode automatically
	preloadedState: initialState,
});

export default store;
