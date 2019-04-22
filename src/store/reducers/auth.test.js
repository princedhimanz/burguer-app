import reducer from './auth';
import * as actionTypes from '../actions/types';

describe('Auth reducer', () => {
  it('shoull return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      afterAuthRedirect: '/',
    });
  });

  it('should store the token after login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          afterAuthRedirect: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            token: 'some user token',
            userId: 'some user id',
            error: null,
            loading: false,
          },
        }
      )
    ).toEqual({
      token: 'some user token',
      userId: 'some user id',
      error: null,
      loading: false,
      afterAuthRedirect: '/',
    });
  });
});
