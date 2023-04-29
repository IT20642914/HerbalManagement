import axios from "axios";
import { BASE_URL, HERBIFY_USER_TOKEN } from "../../utill/AppConstant";
import {USER_SUCCESS,USER_ERROR,USER_REQUEST,USER_LOGIN,USER_LOGOUT} from './userActionType';

export const auth_user_data_success = (userData) => {
    return {
      type: USER_SUCCESS,
      payload: userData,
    };
  };
  
  export const auth_user_data_error = (error) => {
    return {
      type: USER_ERROR,
      payload: error,
    };
  };
  
  export const auth_user_data_request = () => {
    return {
      type: USER_REQUEST,
    };
  };
  
  export const user_login = () => {
    return {
      type: USER_LOGIN,
    };
  };
  
  export const user_logout = () => {
    return {
      type: USER_LOGOUT,
    };
  };

  export const fetch_user_data = () => {
    return (dispatch) => {
      dispatch(auth_user_data_request());
      dispatch(auth_user_data_success({
        "firstname" : "Sachini",
        "lastname" : "Wijeshinghe",
        "username" : "sachi",
        "email" : "sachini@gmail.com",
        "telephone" : "0740000000",
        "userrole" : "buyer"

      }))
      // axios
      //   .post(`${BASE_URL}/auth/validateToken`, {
      //     token: localStorage.getItem(HERBIFY_USER_TOKEN),
      //   })
      //   .then((res) => {
      //     const payload = {
      //       user: res.data,
      //     };
      //     dispatch(auth_user_data_success(payload));
      //     if (payload.user !== null && payload.user._id) dispatch(user_login());
      //     else dispatch(user_logout());
      //   })
      //   .catch((error) => {
      //     dispatch(user_logout());
      //     dispatch(auth_user_data_error(error));
      //   });
    };
  };