export const getAllPizzasReducer = (state={}, action) => {
    switch(action.type) {
        case 'GET_PIZZAS_REQUEST' :  return {
            ...state
        }
        case 'GET_PIZZAS_SUCCESS' : return {
            pizaas: action.payload
        }
        case 'GET_PIZZAS_FAILED' : return {
            error: action.payload
        }
        default: return state
    }
}
