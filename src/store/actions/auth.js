import * as actionTypes from './types';
import axios from 'axios';

const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    token: authData.idToken,
    userId: authData.localId,
  },
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('localId');
  return { type: actionTypes.AUTH_LOGOUT };
};

// Function that will be executed when user logins/registers, that will run after the expiration time, to logout the user when the token expires, so we dont try to send an invalid token to a protected route
const checkAuthTimeout = expirationTime => async dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => async dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  const url = isSignUp
    ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDTbqmEDSf4IXNM9HJ5e0m-55cFtBBjzWA'
    : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDTbqmEDSf4IXNM9HJ5e0m-55cFtBBjzWA';

  try {
    const res = await axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    localStorage.setItem('token', res.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', res.data.localId);
    dispatch(authSuccess(res.data));
    dispatch(checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
  }
};

export const setAfterAuthRedirect = path => ({
  type: actionTypes.SET_AFTER_AUTH_REDIRECT,
  payload: path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const localId = localStorage.getItem('localId');
      dispatch(
        authSuccess({
          idToken: token,
          localId: localId,
          expiresIn: expirationDate,
        })
      );
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
