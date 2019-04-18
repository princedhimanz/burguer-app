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

export const auth = (email, password, isSignUp) => async dispatch => {
  dispatch(authStart());
  console.log(isSignUp);
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
    console.log(res.data);
    dispatch(authSuccess(res.data));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
  }
};
