export const addToCart = (food, quantity) => (dispatch, getState) => {
	var cartItem = {
		name: food.name,
		_id: food._id,
		image: food.image,
		size: food.size,
		quantity: Number(quantity),
		price: food.price,
	};

	if (cartItem.quantity > 10) {
		alert("Please contact the restaurant owner for ordering more than 10 quantity of this item.\nOwner contact: +91 9330188837");
	} else if (cartItem.quantity < 1) {
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
