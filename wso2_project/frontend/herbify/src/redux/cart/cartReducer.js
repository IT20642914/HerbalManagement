import {CART_SUCCESS,CART_REQUEST,CART_ERROR} from './cartActionType';

const initialState = [];

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {
      case CART_SUCCESS:
        return {
          ...action.payload,
        };
      case CART_ERROR:
        return {
          ...action.payload,
        };
      case CART_REQUEST:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
};