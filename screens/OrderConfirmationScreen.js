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
        <LinearGradient colors={['#f5e296', '#926b14']} style={styles.gradient}>
                <Card style={styles.centered}>
                    <Text style={styles.text}>Plata a fost efectuata cu succes.</Text>
                   <Text style={styles.text}>Iti multumim pentru comanda. Aceasta va fi expediata in cel mai scurt timp posibil.
                   </Text>
                   <Button 
                                title={"Inapoi la Magazin"} 
                                color={Colors.primary} 
                                onPress={() => {
                                    props.navigation.navigate('ProductsOverview');}} 
                                />
                </Card>
        </LinearGradient>
    </View>
  );
};

OrderConfirmationScreen.navigationOptions = {
    headerTitle: 'Gardenia'
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        flex: 1
    },
    centered: {
        flex: 1,
        width: '80%',
        maxHeight: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        margin: 16,
        fontFamily: 'montserrat'
    }
});

export default OrderConfirmationScreen;
