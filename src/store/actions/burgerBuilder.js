import * as actionTypes from './types';
import axiosOrders from '../../axios-orders';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: {
    ingredientName: ingredient,
  },
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGEDIENT,
  payload: {
    ingredientName: ingredient,
  },
});

const getIngredientsFailed = () => ({
  type: actionTypes.GET_INGREDIENTS_FAILED,
});

export const getIngredients = () => async dispatch => {
  try {
    const res = await axiosOrders.get('/ingredients.json');
    dispatch({
      type: actionTypes.GET_INGREDIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(getIngredientsFailed());
  }
};
