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

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';

const OrderConfirmationScreen = props => {
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
        <View style={styles.centered}>
            <View style={{height: '35%', width: '70%', marginBottom: 32, alignSelf: 'center'}}>
                <Image
                      style={{height: '100%', width: '100%', margin: 16}}
                      source={require('../assets/logoalb.png')}
                />
            </View>
            <Text style={styles.textPrimary}>Plata a fost efectuata cu succes.</Text>
            <Text style={styles.text}>Iti multumim pentru comanda. Aceasta va fi expediata in cel mai scurt timp posibil.
            </Text>
            <Button 
                title={"Inapoi la Magazin"} 
                color={Colors.accent} 
                onPress={() => {
                    props.navigation.navigate('ProductsOverview');}} 
                />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    centered: {
        flex: 1,
        width: '80%',
        maxHeight: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textPrimary: {
        fontFamily: 'playfair',
        fontSize: 32,
        color: Colors.iron,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        margin: 16,
        fontFamily: 'montserrat',
        color: Colors.iron,
        marginBottom: 24
    }
});

export default OrderConfirmationScreen;
