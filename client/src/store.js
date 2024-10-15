// import {combineReducers} from 'redux'
// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import {composeWithDevTools} from '@redux-devtools/extension'
// import { getAllPizzasReducer } from './reducers/pizzaReducers'

// const finalReducer = combineReducers({
//     getAllPizzasReducer: getAllPizzasReducer
// })
// const initialState = {}

// const composeEnhancers = composeWithDevTools({})

// const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

// export default store

// -----------------------------------------------------------------------------------
// createStore is depreciated. So tha above code will not work:
// -----------------------------------------------------------------------------------

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { getAllPizzasReducer } from './reducers/pizzaReducers';

const finalReducer = combineReducers({
    getAllPizzasReducer: getAllPizzasReducer,
});

const store = configureStore({
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',   // DevTools will be enabled in development mode automatically
});

export default store;
