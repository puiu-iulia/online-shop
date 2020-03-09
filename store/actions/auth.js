import { AsyncStorage } from 'react-native';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';

// let timer;

// export const authenticate = (userId, token, expiryTime) => {
//   return dispatch => {
//     dispatch(setLogoutTimer(expiryTime));
//     dispatch({ type: AUTHENTICATE, userId: userId, token: token });
//   };
// };

export const signup = (email, password) => {
  return async dispatch => {

    data = {
      email: email,
      password: password
    }

    await ShopWooCommerceAPI.post('customers', data, { 
      })
      .then((responseData) => {
        console.log(responseData);
        dispatch({ type: SIGNUP, userId: responseData.id });
      })
      .catch(error => {
        console.log(error);
      }); 

    // const response = await fetch(
    //   'https://clients.fizteq.com/gardenia/wp-json/jwt-auth/v1/token',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       username: email,
    //       password: password
    //     })
    //   }
    // );

    // if (!response.ok) {
    //   const errorResData = await response.json();
    //   console.log(errorResData);
    //   let message = errorResData.message;
    //   throw new Error(message);
    // }

    // const resData = await response.json();
    // console.log(resData);
  };
};

export const login = (email, password) => {
  let isSignedIn;
  return async dispatch => {
    const response = await fetch(
      'https://clients.fizteq.com/gardenia/wp-json/jwt-auth/v1/token',
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
      // if (errorResData.code === "[jwt_auth] empty_password" || errorResData.code === "registration-error-missing-password") {
      //   message = "Te rugam introdu o parolă pentru cont."
      // }
      throw new Error(message);
    }

    const resData = await response.json();
    
    // console.log(resData);

    // ShopWooCommerceAPI.get('customers', {
    //   per_page: 100
    // })
    // .then((responseData) => {
    //   // console.log(responseData);
    //   for (const key in responseData) {
    //     if (responseData[key].email === email) {
    //       id = responseData[key].id;
    //       console.log(id);
    //     }
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    isSignedIn = true;
    dispatch({ type: LOGIN, token: resData.token, userId: resData.user_email, isSignedIn: isSignedIn  });
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    saveDataToStorage(resData.token, resData.user_email);
    
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  console.log('Logged out!');
  return { type: LOGOUT, token: null, userId: null, isSignedIn: false };
};

// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

// const setLogoutTimer = expirationTime => {
//   return dispatch => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};