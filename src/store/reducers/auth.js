import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = state => updateObject(state, { error: null, loading: true });

const authSuccess = (state, payload) =>
  updateObject(state, {
    token: payload.token,
    userId: payload.userId,
    error: null,
    loading: false,
  });

const authFail = (state, payload) =>
  updateObject(state, { error: payload, loading: false });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);
    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);

    default:
      return state;
  }
};
