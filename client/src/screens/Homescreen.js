import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import pizzas from '../pizzadata'   // no more needed data from local file
import Pizza from '../components/Pizza'
import { getAllPizzas } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Homescreen() {
    const dispatch = useDispatch();

    const pizzasstate = useSelector(state => state.getAllPizzasReducer);   // is used to pull the pizzas data from the Redux store (getAllPizzasReducer)
    const {pizzas, error, loading} = pizzasstate;

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    return (
        <div>
            <div className="row justify-content-center">
                {loading ? (<Loading/>) : error ? (<Error error = 'Something went wrong'/>) : (
                    pizzas.map((pizza) => {
                        return (
                            <div className="col-md-3 m-3" key={pizza._id}>
                                <Pizza pizza={pizza} />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}
