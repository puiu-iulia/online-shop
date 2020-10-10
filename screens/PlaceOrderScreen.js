import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, View, KeyboardAvoidingView, Button, Text, Alert, Picker } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from 'react-native-elements';

import Input from '../components/Input';
import Logo from '../components/Logo';
import CustomLinearGradient from '../components/CustomLinearGradient';
import Colors from '../constants/Colors';
import * as data from '../data/judete.json';


import * as orderActions from '../store/actions/orders';
import * as userActions from '../store/actions/user';


const PlaceOrderScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [county, setCounty] = useState();
    const user = useSelector(state => state.user.user);
    const [billingCounty, setBillingCounty] = useState(user? user.billingCounty : "");
    const [sameBilling, setSameBilling] = useState(true);
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.userId);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const [billingName, setBillingName ] = useState(user ? user.billingName : '');
    const [billingEmail, setBillingEmail ] = useState(user ? user.billingEmail : '');
    const [billingPhone, setBillingPhone ] = useState(user ? user.billingPhone : '');
    const [billingCity, setBillingCity ] = useState(user ? user.billingCity : '');
    const [billingAddress, setBillingAddress ] = useState(user ? user.billingAddress : '');
    const [notes, setNotes] = useState('')
    const [shippingName, setShippingName] = useState('');
    const [shippingPhone, setShippingPhone] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    useEffect(() => {
        if (error) {
          Alert.alert('A avut loc o eroare!', error, [{ text: 'In regula' }]);
        }
      }, [error]);

    const placeOrderHandler = async () => {
      if (!sameBilling) {
        try {
          setIsLoading(true);
          await dispatch(orderActions.addOrder(
            cartItems,
            cartTotalAmount,
            billingName,
            billingEmail,
            billingPhone,
            billingCounty,
            billingCity,
            billingAddress,
            notes,
            shippingName,
            shippingPhone,
            county,
            shippingCity,
            shippingAddress
          ));
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      } else {
        try {
          setIsLoading(true);
          await dispatch(orderActions.addOrder(
            cartItems,
            cartTotalAmount,
            billingName,
            billingEmail,
            billingPhone,
            billingCounty,
            billingCity,
            billingAddress,
            notes,
            billingName,
            billingPhone,
            billingCounty,
            billingCity,
            billingAddress
          ));
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      }     
    };

    const updateUserData = async () => {
      try {
        setIsLoading(true);
        await dispatch(userActions.updateUser(
          billingName,
          email,
          billingPhone,
          billingCounty,
          billingCity,
          billingAddress,
        ))
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
          <ScrollView style={styles.orderContainer}>
                <View style={styles.orderContainer}>  
                      <View style={styles.billingTextContainer}><Text style={styles.billingText}>Date facturare:</Text>
                      <CustomLinearGradient />
                      </View> 
                        <Input
                           id="billingName"
                           label="Nume"
                           keyboardType="default"
                           required
                           value={billingName}
                           autoCapitalize="words"
                           errorText="Introdu numele tau."
                           onChangeText={(billingName) => {
                             setBillingName(billingName);
                           }}
                           initialValue={(user) ? user.billingName : ""}
                        />
                        <Input
                            id="billingEmail"
                            label="Adresa de E-mail"
                            keyboardType="email-address"
                            required
                            value={billingEmail}
                            autoCapitalize="none"
                            errorText="Introdu o adresa de email valida."
                            onChangeText={(billingEmail) => {
                              setBillingEmail(billingEmail);
                            }}
                            initialValue={(user) ? user.billingEmail : ""}
                        />
                        <Input
                            id="billingPhone"
                            label="Numar de Telefon"
                            keyboardType="number-pad"
                            required
                            value={billingPhone}
                            minLength={10}
                            autoCapitalize="none"
                            errorText="Introdu un numar de telefon valid."
                            onChangeText={(billingPhone) => {
                              setBillingPhone(billingPhone);
                            }}
                        />
                         <View style={styles.countyContainer}>
                          <Text>Judet </Text>
                          <Picker
                              style={styles.countyPicker}
                              mode="dropdown"
                              selectedValue={billingCounty}
                              onValueChange={(billingCounty)=> {
                                setBillingCounty(billingCounty);
                              }}
                            >
                              {data.judete.map((item, index) => {
                                return (<Picker.Item label={item.nume} value={item.auto} key={index}/>) 
                              })}
                            </Picker>
                        </View>
                        <Input
                              id="billingCity"
                              label="Localitate"
                              keyboardType="default"
                              required
                              value={billingCity}
                              autoCapitalize="words"
                              errorText="Introdu localitatea."
                              onChangeText={(billingCity) => {
                                setBillingCity(billingCity);
                              }}
                              initialValue={(user) ? user.billingCity : ""}
                          />
                          <Input
                              id="billingAddress"
                              value={billingAddress}
                              label="Adresa"
                              keyboardType="default"
                              required
                              placeholder="Strada, numar, alte detalii..."
                              autoCapitalize="none"
                              errorText="Introdu o adresa valida."
                              onChangeText={(billingAddress) => {
                                setBillingAddress(billingAddress);
                              }}
                              initialValue={(user) ? user.billingAddress : ""}
                          />
                            <Input
                              id="billingAddress"
                              value={notes}
                              label="Note comanda (optional)"
                              keyboardType="default"
                              required
                              placeholder="Exemplu: note pentru livrare."
                              autoCapitalize="none"
                              errorText="Introdu o adresa valida."
                              onChangeText={(notes) => {
                                setNotes(notes);
                              }}
                              initialValue={(user) ? user.billingAddress : ""}
                          />     
                       
                        <CheckBox 
                            containerStyle={styles.checkBoxContainer}
                            textStyle={styles.checkBoxTextStyle}     
                            checkedColor={Colors.accent}
                            checked={!sameBilling}
                            size={32}
                            checkedIcon={'check-square-o'}
                            onIconPress={() => {
                              setSameBilling(prevState => !prevState);
                            }}
                            title='Vreau livrarea la o alta adresa'
                          />
                        {!sameBilling && (
                        <View style={styles.shippingContainer}>
                          <View style={styles.billingTextContainer}><Text style={styles.billingText}>Date livrare:</Text></View> 
                          <CustomLinearGradient />
                          <Input
                            id="shippingName"
                            label="Nume"
                            id={shippingName}
                            keyboardType="default"
                            required
                            autoCapitalize="words"
                            errorText="Introdu numele tau."
                            onChangeText={(shippingName) => {
                              setShippingName(shippingName);
                            }}
                            initialValue=''
                          />
                          <Input
                            id="shipppingPhone"
                            label="Numar de Telefon"
                            keyboardType="number-pad"
                            required
                            value={shippingPhone}
                            minLength={8}
                            autoCapitalize="none"
                            errorText="Introdu un numar de telefon valid."
                            onChangeText={(shippingPhone) => {
                              setShippingPhone(shippingPhone);
                            }}
                            initialValue=''
                          />
                          <View style={styles.countyContainer}>
                            <Text>Judet </Text>
                            <Picker
                                style={styles.countyPicker}
                                mode="dropdown"
                                selectedValue={county}
                                onValueChange={(county)=> {
                                  setCounty(county);
                                }}
                              >
                                {data.judete.map((item, index) => {
                                  return (<Picker.Item label={item.nume} value={item.auto} key={index}/>) 
                                })}
                              </Picker>
                          </View>
                          <Input
                                id="shippingCity"
                                label="Localitate"
                                keyboardType="default"
                                required
                                value={shippingCity}
                                autoCapitalize="words"
                                errorText="Introdu localitatea."
                                onChangeText={(shippingCity) => {
                                  setShippingCity(shippingCity);
                                }}
                                initialValue=''
                            />
                            <Input
                                id="shippingAddress"
                                label="Adresa"
                                keyboardType="default"
                                required
                                value={shippingAddress}
                                placeholder="Strada, numar, alte detalii..."
                                autoCapitalize="none"
                                errorText="Introdu o adresa valida."
                                onChangeText={(shippingAddress) => {
                                  setShippingAddress(shippingAddress);
                                }}
                                initialValue=''
                            />
                          </View>
                        )} 
                        <View style={styles.orderSummary}>
                          <Text style={styles.orderSummaryText}>Total de plata: {Math.round(props.navigation.getParam('totalAmount') * 100) / 100} RON</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {isLoading ? ( 
                              <ActivityIndicator size='small' color={Colors.primary} />
                            ) : 
                            (<Button
                              disabled={
                                (billingName == '') 
                                || (billingEmail == '') 
                                || (billingPhone == '') 
                                || (billingCity.length == '') 
                                || (billingAddress.length == '')
                              } 
                              title={"Trimite Comanda"} 
                              color={Colors.primary} 
                              onPress={() => {
                                placeOrderHandler().then(() => {
                                    setIsLoading(false);
                                    props.navigation.navigate('OrderConfirmation');
                                });
                                if (user) {
                                  updateUserData();
                                }
                              }} 
                            />)}
                        </View>          
                </View>
              </ScrollView>
        </KeyboardAvoidingView>
       
    );
};

PlaceOrderScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: Colors.primary,
  headerTitle: <Logo title={'Trimite Comanda'} style={{textTransform: 'none'}} />,
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    billingTextContainer: {
      marginVertical: 8
    },
    billingText: {
      fontSize: 18,
      fontFamily: 'montserrat'
    },
    orderContainer: {
        width: '100%',
        paddingHorizontal: 10
    },
    orderSummary: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20
    },
    checkBoxContainer: {
      padding: 0,
      marginVertical: 24,
      backgroundColor: 'white',
      borderWidth: 0
    },
    checkBoxTextStyle: {
      fontFamily: 'montserrat',
      color: Colors.primary
    },
    buttonContainer: {
        marginVertical: 16
    }, 
    orderSummaryText: {
      fontSize: 20,
      fontFamily: 'montserrat'
    },
    countyContainer: {
      marginTop: 10
    },
    countyPicker: {
      padding: 0
    }, 
    centered: {
      flex: 1,
      marginVertical: 8,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default PlaceOrderScreen;
