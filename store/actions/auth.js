import { AsyncStorage } from 'react-native';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';


export const authenticate = (userId, token ) => {
  return dispatch => {
    let isSignedIn = true;
    dispatch({ type: AUTHENTICATE, userId: userId, token: token, isSignedIn: true });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    data = {
      email: email,
      password: password
    }

    await ShopWooCommerceAPI.post('customers', data, { 
      })
      .then((responseData) => {
        console.log("response auth", responseData);
        dispatch({ type: SIGNUP, userId: responseData.id });
      })
      .catch(error => {
        console.log("error auth", error);
        const errorResData = error.json();
        let message = errorResData.message;
        throw new Error(message);
      }); 
  };
};

export const login = (email, password) => {
  let isSignedIn;
  return async dispatch => {
    console.log(password);
    const response = await fetch(
      'https://gardenia.ro/wp-json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      let message = errorResData;
      if (errorResData.code === "[jwt_auth] invalid_email" || errorResData.code === "[jwt_auth] incorrect_password") {
        message = "Ai introdus o adresa de email sau o parola gresita";
      }
      throw new Error(message);
    }

    const resData = await response.json();
  
    isSignedIn = true;
    dispatch({ type: LOGIN, token: resData.token, userId: resData.user_email, isSignedIn: isSignedIn  });
    saveDataToStorage(resData.token, resData.user_email);  
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  console.log('Logged out!');
  return { type: LOGOUT, token: null, userId: null, isSignedIn: false };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};