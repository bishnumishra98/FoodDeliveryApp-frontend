export const addToCart = (pizza, quantity, variant) => (dispatch, getState) => {
    var cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        variant: variant,
        quantity: Number(quantity),
        prices: pizza.prices,
        price: Number(pizza.prices[0][variant])
    }

    if(cartItem.quantity > 10) {
        alert("Please contact the restaurant owner for ordering more than 10 quantity of this item.\nOwner contact: +91 9330188837");
    } else {
        dispatch({type: 'ADD_TO_CART', payload: cartItem});
    }

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export const deleteFromCart = (pizza) => (dispatch, getState) => {
    dispatch({type: 'DELETE_FROM_CART', payload: pizza});
    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
