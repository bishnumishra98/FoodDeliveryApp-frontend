export const placeOrderReducer = (state={} , action) => {
    switch(action.type) {
        case 'PLACE_ORDER_REQUEST' : return {
            loading : true
        }
        case 'PLACE_ORDER_FAILED' : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}


export const getUserOrdersReducer = (state={orders : []} , action) => {
    switch(action.type) {
        case 'GET_USER_ORDERS_REQUEST' : return {
            loading : true,
            ...state
        }
        case 'GET_USER_ORDERS_SUCCESS' : return {
            loading : false ,
            orders : action.payload
        }
        case 'GET_USER_ORDERS_FAILED' : return {
            error : action.payload ,
            loading : false
        }
        default : return state
    }
}


export const getAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'GET_ALLORDERS_REQUEST':
            return {
                loading: true,
                ...state,
            };
        case 'GET_ALLORDERS_SUCCESS':
            return {
                loading: false,
                orders: action.payload,
            };
        case 'GET_ALLORDERS_FAILED':
            return {
                error: action.payload,
                loading: false,
            };
        case 'DELIVER_ORDER_SUCCESS':   // handle successful order delivery status update
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, deliveryStatus: action.payload.deliveryStatus } : order
                ),
            };
        default:
            return state;
    }
};
