import {USER_SUCCESS,USER_ERROR,USER_REQUEST,USER_LOGIN,USER_LOGOUT} from './userActionType';

const initialState = {
    login: false,
    logout: false,
    error: "",
    user_data: "",
    loading: true,
  };

  export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_SUCCESS:
        return {
          ...state,
          user_data: action.payload,
          error: "",
          loading: false,
        };
      case USER_ERROR:
        return {
          ...state,
          user_data: "",
          error: action.payload,
          loading: false,
        };
      case USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_LOGIN:
        return {
          ...state,
          login: true,
          logout: false,
        };
      case USER_LOGOUT:
        return {
          ...state,
          login: false,
          logout: true,
        };
      default:
        return state;
    }
  };
  