export const getAllFoodsReducer = (state = { foods: [] }, action) => {
	switch (action.type) {
		case "GET_FOODS_REQUEST":
			return {
				loading: true,
				...state,
			};
		case "GET_FOODS_SUCCESS":
			return {
				loading: false,
				foods: action.payload,
			};
		case "GET_FOODS_FAILED":
			return {
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export const addFoodReducer = (state = {} , action) => {
    switch(action.type) {
        case 'ADD_PIZZA_REQUEST' : return {
            loading : true,
            ...state
        }
        case 'ADD_PIZZA_SUCCESS' : return {
            loading : false ,
            success : true,
        }
        case 'ADD_PIZZA_FAILED' : return {
            error : action.payload ,
            loading : false
        }
        default : return state
    }
};
