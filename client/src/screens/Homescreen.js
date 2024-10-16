import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import pizzas from '../pizzadata'
import Pizza from '../components/Pizza'
import { getAllPizzas } from '../actions/pizzaActions';

export default function Homescreen() {
    const dispatch = useDispatch();

    const pizzasstate = useSelector(state => state.getAllPizzasReducer);   // useSelector hook is used to get data from reducer
    const {pizzas, error, loading} = pizzasstate;

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    return (
        <div>
            <div className="row">
                {loading ? (<h1>Loading...</h1>) : error ? (<h1>Something went wrong.</h1>) : (
                    pizzas.map((pizza, index) => {
                        return (
                            <div className="col-md-4" key={index}>
                                <Pizza pizza={pizza} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}
