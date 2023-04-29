import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import {CartReducer} from './cart/cartReducer';
import {UserReducer} from './user/userReducer';

const rootReducer = combineReducers({
    currentUser: UserReducer,
    cart: CartReducer,
  });
  
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  
  export default store;