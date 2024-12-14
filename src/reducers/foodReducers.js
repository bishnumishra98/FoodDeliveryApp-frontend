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

export const getFoodByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_FOODBYID_REQUEST":
            return {
                loading: true,
                ...state,
            };
        case "GET_FOODBYID_SUCCESS":
            return {
                loading: false,
                food: action.payload,
            };
        case "GET_FOODBYID_FAILED":
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
        case 'ADD_FOOD_REQUEST':
			return {
				loading : true,
				...state
        	}
        case 'ADD_FOOD_SUCCESS':
			return {
				loading : false ,
				success : true,
        	}
        case 'ADD_FOOD_FAILED':
			return {
				error : action.payload ,
				loading : false
			}
        default:
			return state
    }
};

export const editFoodReducer = (state = {}, action) => {
    switch (action.type) {
        case "EDIT_FOOD_REQUEST":
            return {
                editloading: true,
                ...state,
            };
        case "EDIT_FOOD_SUCCESS":
            return {
                editloading: false,
                editsuccess: true,
            };
        case "EDIT_FOOD_FAILED":
            return {
                editerror: action.payload,
                editloading: false,
            };
        default:
            return state;
    }
};
