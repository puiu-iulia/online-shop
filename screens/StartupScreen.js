import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  Text, 
  ScrollView,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';
import CustomLinearGradient from '../components/CustomLinearGradient';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const goToStore = async () => {
      const userChecks = await AsyncStorage.getItem('userChecks');
      if (userChecks) {
        props.navigation.navigate('ProductsOverview');
      }
    }
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData'); 
      console.log(userData);
      if (!userData) {
        props.navigation.navigate('ProductsOverview');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, } = transformedData;   
      props.navigation.navigate('ProductsOverview');
      dispatch(authActions.authenticate(userId, token, ));
    };
    tryLogin().then(() => {
      goToStore();
    });
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
