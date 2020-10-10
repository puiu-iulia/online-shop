import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Dimensions
} from 'react-native';

import Colors from '../constants/Colors';

const OrderConfirmationScreen = props => {
  const orderMeta = useSelector(state => state.orders.meta);

  return (
    <View style={styles.screen}>
        <View style={styles.centered}>
            <Text style={styles.textPrimary}>Detaliile noastre bancare</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.account_number}</Text>
            <Text style={styles.text}>Banca</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.bank_name}</Text>
            <Text style={styles.text}>IBAN</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.iban}</Text>
            <Text style={styles.text}>Numar comanda</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.number}</Text>
            <Text style={styles.text}>Total plata</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.total} RON</Text>
            <Text style={styles.text}>Contact</Text>
            <Text style={{...styles.text, ...styles.textUnder}}>{orderMeta.suplier_email}</Text>
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
    imageView: {
        height: (Dimensions.get('window').width*0.6)/1.66, 
        width: Dimensions.get('window').width*0.6,
        alignSelf: 'center',
        marginBottom: 8,
        marginTop: 24
      },
    image: {
        height: '100%', 
        width: '100%'
    },
    textPrimary: {
        fontFamily: 'playfair',
        fontSize: 20,
        color: Colors.iron,
        textAlign: 'center'
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: Colors.iron,
    },
    textUnder: {
        marginTop: 8,
        marginBottom: 24
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginBottom: 4,
        fontSize: 24,
        color: Colors.accent,
        textTransform: 'uppercase',
        fontFamily: 'playfair',
        fontWeight: '400'
    }
});

OrderConfirmationScreen.navigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerLeft: null,
    headerTintColor: Colors.primary,
    headerTitle: 
    <View style={styles.view}>
        <Text style={styles.logo}>Gardenia</Text>
    </View>
}

export default OrderConfirmationScreen;
