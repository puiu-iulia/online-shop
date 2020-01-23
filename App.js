import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import categoriesReducer from './store/reducers/categories';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';
import ordersReducer from './store/reducers/orders';
import userReducer from './store/reducers/user';
import MainNavigator from './navigation/MainNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  user: userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
