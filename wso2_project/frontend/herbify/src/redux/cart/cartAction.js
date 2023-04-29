import MasterAPI from '../../utill/Api';
import { CART_SUCCESS, CART_ERROR, CART_REQUEST } from './cartActionType';

export const cart_data_success = (cartdata) => {
    return {
        type: CART_SUCCESS,
        payload: cartdata,
    };
}

export const cart_data_error = (error) => {
    return {
        type: CART_ERROR,
        payload: error,
    };
};

export const cart_data_request = () => {
    return {
        type: CART_REQUEST,
    };
};

export const fetch_cart_data = () => {
    return (dispatch) => {
        //dispatch(cart_data_request);
        // MasterAPI()
        //     .get("/cart")
        //     .then((res) => {
        //         dispatch(cart_data_success(res.data));
        //     })
        //     .catch((error) => {
        //         dispatch(cart_data_success({}));
        //         dispatch(cart_data_error(error));
        //     });
        //dispatch(cart_data_success([]));
    }
}

