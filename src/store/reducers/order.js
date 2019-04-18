import * as actionTypes from '../actions/types';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return { ...state, purchased: false };

    case actionTypes.PURCHASE_BURGER_START:
      return { ...state, loading: true };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: payload.id,
        ...payload.orderData,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
