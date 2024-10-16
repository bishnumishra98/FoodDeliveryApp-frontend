// -----------------------------------------------------------------------------------
// createStore is depreciated. use configureStore.
// -----------------------------------------------------------------------------------

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { getAllPizzasReducer } from './reducers/pizzaReducers';
import { cartReducer } from './reducers/cartReducers';

const finalReducer = combineReducers({
    getAllPizzasReducer: getAllPizzasReducer,
    cartReducer: cartReducer
});

const store = configureStore({
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',   // DevTools will be enabled in development mode automatically
});

export default store;
