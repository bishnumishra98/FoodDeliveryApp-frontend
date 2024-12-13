import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFood, getAllFoods } from "../actions/foodActions";
import Error from "../components/Error";
// import Filter from "../components/Filter";
import Loading from "../components/Loading";

export default function Foodslist() {
    const dispatch = useDispatch();
    const foodsstate = useSelector((state) => state.getAllFoodsReducer);
    const { foods, error, loading } = foodsstate;

    useEffect(() => {
        dispatch(getAllFoods());
    }, []);

    return <div>
        {loading && (<Loading/>)}
        {error && (<Error error='Something went wrong'/>)}

        <table  className='table table-bordered table-responsive-sm'>

            <thead className='thead-dark'>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {foods && foods.map(food=>{

                    return <tr>
                        <td>{food.name}</td>
                        <td>{food.price}</td>
                        <td>{food.category}</td>
                        <td>
                            <img
                                src={food.image}
                                alt="food-image"
                                style={{ height: '80px', width: '80px' }}
                            />
                        </td>
                        <td>
                            <i className='fa fa-trash m-1' onClick={()=>{dispatch(deleteFood(food._id))}}></i>
                            <Link to={`/admin/editfood/${food._id}`}><i className='fa fa-edit m-1'></i></Link>
                        </td>

                    </tr>
                })}
            </tbody>
        </table>

    
    </div>;
}
