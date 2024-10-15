import axios from "axios";

export const getAllPizzas = () => async disptach => {   // getAllPizzas is the action name
    disptach({type: 'GET_PIZZAS_REQUEST'})

    try {
        const response = await axios.get('/api/pizzas/getallpizzas')
        console.log(response)
        disptach({type: 'GET_PIZZAS_SUCCESS', payload: response.date})
    } catch (error) {
        disptach({type: 'GET_PIZZAS_FAILED', payload: error})
    }
}
