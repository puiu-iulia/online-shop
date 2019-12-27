import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://clients.fizteq.com/gardenia/wp-json/wp/v2/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        // parseInt(resData.expiresIn) * 1000
      )
    );
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    saveDataToStorage(resData.idToken, resData.localId);
  };
};

export const login = (email, password) => {
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
          password: password,
        })
      }
    );
    console.log(response.code);
    if (!response.ok) {
      // const errorResData = await response.json();
      // const errorId = errorResData.error.code;
      // let message = 'Something went wrong!';
      // if (errorId === 'jwt_auth_failed') {
      //   message = 'This email could not be found!';
      // } else if (errorId === 'INVALID_PASSWORD') {
      //   message = 'This password is not valid!';
      // }
      throw new Error(response.code);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        // parseInt(resData.expiresIn) * 1000
      )
    );
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    saveDataToStorage(resData.idToken, resData.localId);
  };
};

export const logout = () => {
  // clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
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
