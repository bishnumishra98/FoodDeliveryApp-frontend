export const cartReducer = (state={cartItems: []}, action) => {
    switch(action.type) {
        case 'ADD_TO_CART' : 
        
        // If an item is already present in the cart, and the user clicks to add that item again from the Homescreen,
        // then update that item in the cart, instead of creating the new same item in the cart.
        const alreadyExists = state.cartItems.find(item => item._id === action.payload._id && item.variant === action.payload.variant);

        if (alreadyExists) {
            return {
                ...state,
                cartItems: state.cartItems.map(item => 
                    item._id === action.payload._id && item.variant === action.payload.variant ? action.payload : item
                )
            };
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        }

        case 'DELETE_FROM_CART' : 
        return {
            ...state,
            cartItems: state.cartItems.filter(item => 
                item._id !== action.payload._id || item.variant !== action.payload.variant
            )
        };

        
        default: return state
    }
}
