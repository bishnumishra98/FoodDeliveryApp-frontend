import axios from "axios";

export const getAllPizzas = () => disptach => {
    disptach({type: 'GET_PIZZAS_REQUEST'})

    try {
        const response = axios.get('/api/pizzas/getpizzas')
        console.log(response)
        disptach({type: 'GET_PIZZAS_SUCCESS', payload: response.date})
    } catch (error) {
        disptach({type: 'GET_PIZZAS_FAILED', payload: error})
    }
}
