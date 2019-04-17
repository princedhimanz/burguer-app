import * as actionTypes from './types';

export const ingredientAdded = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: {
    ingredientName: ingredient,
  },
});

export const ingredientRemoved = ingredient => ({
  type: actionTypes.REMOVE_INGEDIENT,
  payload: {
    ingredientName: ingredient,
  },
});
