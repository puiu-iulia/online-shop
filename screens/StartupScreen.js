import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {

    const goToWelcome = async () => {
      const userChecks = await AsyncStorage.getItem('userChecks');
      if (userChecks) {
        tryLogin();
      } else {
        props.navigation.navigate('Welcome');
        return;
      }
    };

    const loadUser = async () => {
      try {
        await dispatch(userActions.getUser());
      } catch (err) {
        setUserError(err.message);
      }; 
    };
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData'); 
      if (!userData) {
        props.navigation.navigate('ProductsOverview');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, } = transformedData;   
      props.navigation.navigate('ProductsOverview');
      dispatch(authActions.authenticate(userId, token));
      loadUser();
    }; 
    goToWelcome(); 
  }, [dispatch]);


  return (
    <View style={styles.centered}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../assets/loading.gif')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fcfcff'
  }
});

export default StartupScreen;
