import * as actionTypes from '../actions/types';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

// Helper functions
const purchaseInit = state => {
  return updateObject(state, { purchased: false });
};

const purchaseStart = state => {
  return updateObject(state, { loading: true });
};

const purchaseSuccess = (state, payload) => {
  const newOrder = updateObject(payload.orderData, { id: payload.id });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const purchaseFail = state => {
  return updateObject(state, { loading: false });
};

const getOrdersStart = state => {
  return updateObject(state, { loading: true });
};

const getOrdersSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    orders: payload.orders,
  });
};

const getOrdersFail = state => {
  return updateObject(state, { loading: false });
};

// Reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
    // Submit new order to server
    case actionTypes.PURCHASE_BURGER_INIT:
      return purchaseInit(state);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseSuccess(state, payload);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseFail(state);

    // Get all orders
    case actionTypes.GET_ORDERS_START:
      return getOrdersStart(state);

    case actionTypes.GET_ORDERS_SUCCESS:
      return getOrdersSuccess(state, payload);

    case actionTypes.GET_ORDERS_FAIL:
      return getOrdersFail(state);

    default:
      return state;
  }
};
