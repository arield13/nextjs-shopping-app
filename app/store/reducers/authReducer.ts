import { AuthActionTypes, LOGIN_SUCCESS,  AuthState, LOGOUT } from '../types/authTypes';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
    default:
      return state;
  }
};

export default authReducer;
