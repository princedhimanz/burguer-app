import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  afterAuthRedirect: '/',
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

const authLogout = state => updateObject(state, { token: null, userId: null });

const setAfterAuthRedirect = (state, payload) =>
  updateObject(state, { afterAuthRedirect: payload });

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);
    case actionTypes.AUTH_FAIL:
      return authFail(state, payload);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AFTER_AUTH_REDIRECT:
      return setAfterAuthRedirect(state, payload);

    default:
      return state;
  }
};
