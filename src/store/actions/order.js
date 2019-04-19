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

export const purchaseBurger = (order, token) => async dispatch => {
  try {
    dispatch(purchaseBurgerStart());
    const res = await axiosOrders.post('/orders.json?auth=' + token, order);
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

export const getOrders = (token, userId) => async dispatch => {
  console.log(userId);
  try {
    dispatch(getOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const res = await axiosOrders.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    dispatch(getOrdersSuccess(fetchedOrders));
  } catch (err) {
    dispatch(getOrdersFail(err));
  }
};
