export const getAllFoodsReducer = (state = { foods: [] }, action) => {
  // getAllFoodsReducer is the reducer name
  switch (action.type) {
    case "GET_PIZZAS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_PIZZAS_SUCCESS":
      return {
        loading: false,
        foods: action.payload,
      };
    case "GET_PIZZAS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
