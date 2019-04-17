import * as actionTypes from '../actions/types';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 0,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
