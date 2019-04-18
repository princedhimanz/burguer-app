import * as actionTypes from '../actions/types';
import { updateObject } from './../utility';

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

// Helper functions called by the reducer
const getIngredients = (state, payload) => {
  return updateObject(state, {
    ingredients: payload,
    error: false,
    totalPrice: 4,
  });
};

const getIngredientsFailed = state => {
  return updateObject(state, { error: true });
};

const addIngredient = (state, payload) => {
  const updatedIngredient = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, payload) => {
  const updatedIngredient = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
  };
  return updateObject(state, updatedState);
};

// Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_INGREDIENTS:
      return getIngredients(state, payload);

    case actionTypes.GET_INGREDIENTS_FAILED:
      return getIngredientsFailed(state, payload);

    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, payload);

    case actionTypes.REMOVE_INGEDIENT:
      return removeIngredient(state, payload);

    default:
      return state;
  }
};
