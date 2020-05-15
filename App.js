import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import categoriesReducer from './store/reducers/categories';
import cartReducer from './store/reducers/cart';
import authReducer from './store/reducers/auth';
import ordersReducer from './store/reducers/orders';
import userReducer from './store/reducers/user';
import variationReducer from './store/reducers/variation';
import MainNavigator from './navigation/MainNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  user: userReducer,
  variation: variationReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat': require('./assets/Montserrat-Regular.ttf'),
    'playfair': require('./assets/PlayfairDisplay-Regular.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
