import * as actionTypes from './types';
import axiosOrders from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    id,
    orderData,
  },
});

const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  payload: {
    error,
  },
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurgerInit = () => ({
  type: actionTypes.PURCHASE_BURGER_INIT,
});

export const purchaseBurger = order => async dispatch => {
  try {
    dispatch(purchaseBurgerStart());
    const res = await axiosOrders.post('/orders.json', order);
    dispatch(purchaseBurgerSuccess(res.data.name, order));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
    console.log(err);
  }
};
