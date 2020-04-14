import { AUTHENTICATE, LOGIN, SIGNUP, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  isSignedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isSignedIn: action.isSignedIn
      };
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        isSignedIn: action.isSignedIn
      };
    case SIGNUP:
      return {
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
