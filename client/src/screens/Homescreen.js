import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import pizzas from '../pizzadata'
import Pizza from '../components/Pizza'
import { getAllPizzas } from '../actions/pizzaActions';

export default function Homescreen() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])

    return (
        <div>
            <div className="row">
                {pizzas.map(pizza => {
                    return <div className="col-md-4">
                        <div>
                            <Pizza pizza = {pizza}/>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
