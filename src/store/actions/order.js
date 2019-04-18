import * as actionTypes from './types';
import axiosOrders from '../../axios-orders';

// Post a new order to server
export const purchaseBurgerInit = () => ({
  type: actionTypes.PURCHASE_BURGER_INIT,
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

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

export const purchaseBurger = order => async dispatch => {
  try {
    dispatch(purchaseBurgerStart());
    const res = await axiosOrders.post('/orders.json', order);
    dispatch(purchaseBurgerSuccess(res.data.name, order));
  } catch (err) {
    dispatch(purchaseBurgerFail(err));
  }
};

// Get all ordersfrom server
export const getOrdersInit = () => ({ type: actionTypes.GET_ORDERS_INIT });

const getOrdersStart = () => ({ type: actionTypes.GET_ORDERS_START });

const getOrdersSuccess = orders => ({
  type: actionTypes.GET_ORDERS_SUCCESS,
  payload: { orders },
});

const getOrdersFail = error => ({
  type: actionTypes.GET_ORDERS_FAIL,
  payload: {
    error,
  },
});

export const getOrders = () => async dispatch => {
  try {
    dispatch(getOrdersStart());
    const res = await axiosOrders.get('/orders.json');
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    dispatch(getOrdersSuccess(fetchedOrders));
  } catch (err) {
    dispatch(getOrdersFail(err));
  }
};
