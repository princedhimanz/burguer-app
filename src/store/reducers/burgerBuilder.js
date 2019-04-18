import * as actionTypes from '../actions/types';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_INGREDIENTS:
      return {
        ...state,
        ingredients: payload,
        error: false,
        totalPrice: 4,
      };
    case actionTypes.GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
        },
        error: true,
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredientName]:
            state.ingredients[payload.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
      };
    case actionTypes.REMOVE_INGEDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.ingredientName]:
            state.ingredients[payload.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[payload.ingredientName],
      };
    default:
      return state;
  }
};
