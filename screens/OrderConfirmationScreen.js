import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button
} from 'react-native';

import Colors from '../constants/Colors';

const OrderConfirmationScreen = props => {

  return (
    <View style={styles.screen}>
        <View style={styles.centered}>
            <View style={{height: '30%', width: '70%', marginBottom: 32, marginRight: 16, alignSelf: 'center'}}>
                <Image
                      style={{height: '100%', width: '100%', margin: 16}}
                      source={require('../assets/logoalb.png')}
                />
            </View>
            <Text style={styles.textPrimary}>Comanda a fost trimisa cu succes.</Text>
            <Text style={styles.text}>Iti multumim. Aceasta va fi expediata in cel mai scurt timp posibil.
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

OrderConfirmationScreen.navigationOptions = {
    header: null
}

export default OrderConfirmationScreen;
