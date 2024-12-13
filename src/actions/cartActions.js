export const addToCart = (food, quantity) => (dispatch, getState) => {
	var cartItem = {
		name: food.name,
		_id: food._id,
		image: food.image,
		size: food.size,
		quantity: Number(quantity),
		price: food.price,
	};

	if (cartItem.quantity < 1) {
		dispatch({ type: "DELETE_FROM_CART", payload: food });
	} else {
		dispatch({ type: "ADD_TO_CART", payload: cartItem });
	}

	const cartItems = getState().cartReducer.cartItems;
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (food) => (dispatch, getState) => {
	dispatch({ type: "DELETE_FROM_CART", payload: food });
	const cartItems = getState().cartReducer.cartItems;
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = () => (dispatch) => {
    dispatch({ type: "CLEAR_CART" });
};
