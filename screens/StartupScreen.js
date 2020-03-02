import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text, 
  ScrollView,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

//   useEffect(() => {
//     const tryLogin = async () => {
//       const userData = await AsyncStorage.getItem('userData');
//       if (!userData) {
//         props.navigation.navigate('Auth');
//         return;
//       }
//       const transformedData = JSON.parse(userData);
//       const { token, userId, expiryDate } = transformedData;
//       const expirationDate = new Date(expiryDate);

//       if (expirationDate <= new Date() || !token || !userId) {
//         props.navigation.navigate('Auth');
//         return;
//       }

//       const expirationTime = expirationDate.getTime() - new Date().getTime();

//       props.navigation.navigate('Shop');
//       dispatch(authActions.authenticate(userId, token, expirationTime));
//     };

//     tryLogin();
//   }, [dispatch]);

  return (
    // <View style={styles.screen}>
    //   <ActivityIndicator size="large" color={Colors.primary} />
    // </View>
    <View style={styles.screen}>
        <LinearGradient colors={['#f5e296', '#926b14']} style={styles.gradient}>
                    <Card style={styles.loginContainer}>
                        <ScrollView>
                        
                            <View >
                                <CheckBox 
                                    title='Sunt de acord cu Termenii si Conditiile de Utilizare si Politica de Confidentialitate'
                                />
                                <CheckBox 
                                    title='Sunt de acord cu prelucrarea datelor cu caracter personal'
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button 
                                title={"Conecteaza-te"} 
                                color={Colors.primary} 
                                onPress={() => {
                                    props.navigation.navigate('AuthScreen');}} 
                                />
                            <Button 
                                title={"Mergi spre Magazin"} 
                                color={Colors.primary} 
                                onPress={() => {
                                    props.navigation.navigate('ProductsOverview');}} 
                                />
                            </View>  
                        </ScrollView>
                    </Card>
                </LinearGradient>
            </View>
  );
};

StartupScreen.navigationOptions = {
    headerTitle: 'Gardenia'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  loginContainer: {
    width: '98%',
    // maxWidth: 600,
    maxHeight: 400,
    padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  }
});

export default StartupScreen;
