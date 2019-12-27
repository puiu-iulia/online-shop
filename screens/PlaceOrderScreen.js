import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button, Text, Alert, Picker } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as data from '../data/judete.json';


// import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const PlaceOrderScreen = props => {
    const [error, setError] = useState();
    const [county, setCounty] = useState();
    const [town, setTown] = useState();
    const dispatch = useDispatch();

    const countyData = [];

    for (const key in data.judete) {
      countyData.push(data.judete[key].nume);
    }
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          name: '',
          emailAddress: '',
          address: '',
          phoneNumber: '',
          town
        },
        inputValidities: {
          name: '',
          emailAddress: '',
          address: '',
          phoneNumber: '',
          town
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
          Alert.alert('A avut loc o eroare!', error, [{ text: 'In regula' }]);
        }
      }, [error]);

    const placeOrderHandler = async () => {
        // let action;
        // if (isSignup) {
        //   action =  authActions.signup(
        //     formState.inputValues.email,
        //     formState.inputValues.password
        // );
        // } else {
        //   action = authActions.login(
        //     formState.inputValues.email,
        //     formState.inputValues.password
        // );
        // }
        // setError(null);
        // setIsLoading(true);
        // try {
        //     await dispatch(action);
        //     props.navigation.navigate('Shop');
        // } catch (err) {
        //     setError(err.message);
        //     setIsLoading(false);
        // }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
                <View style={styles.orderContainer}>
                    <ScrollView>
                        <Input
                           id="name"
                           label="Nume"
                           keyboardType="default"
                           required
                           autoCapitalize="words"
                           errorText="Introdu numele tau."
                           onInputChange={inputChangeHandler}
                           initialValue=''
                        />
                        <Input
                            id="email"
                            label="Adresa de E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Introdu o adresa de email valida."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id="phoneNumber"
                            label="Numar de Telefon"
                            keyboardType="number-pad"
                            secureTextEntry
                            required
                            minLength={8}
                            autoCapitalize="none"
                            errorText="Introdu un numar de telefon valid."
                            onInputChange={inputChangeHandler}
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
                            {countyData.map((item, index) => {
                              return (<Picker.Item label={item} value={index} key={index}/>) 
                            })}
                          </Picker>
                        </View>
                        <Input
                           id="town"
                           label="Localitate"
                           keyboardType="default"
                           required
                           autoCapitalize="words"
                           errorText="Introdu localitatea."
                           onInputChange={inputChangeHandler}
                           initialValue=''
                        />
                        <Input
                            id="address"
                            label="Adresa"
                            keyboardType="default"
                            required
                            placeholder="Strada, numar, alte detalii..."
                            autoCapitalize="none"
                            errorText="Introdu o adresa valida."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.orderSummary}>
                          <Text style={styles.orderSummaryText}>Total de plata: {Math.round(props.navigation.getParam('totalAmount') * 100) / 100} RON</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                              title={"Plateste"} 
                              color={Colors.primary} 
                              onPress={() => {payHandler}} 
                            />
                        </View>   
                    </ScrollView>
                </View>
        </KeyboardAvoidingView>
       
    );
};

PlaceOrderScreen.navigationOptions = {
    headerTitle: 'Trimite Comanda'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    orderContainer: {
        width: '96%',
        padding: 10
    },
    orderSummary: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20
    },
    buttonContainer: {
        marginTop: 16
    }, 
    orderSummaryText: {
      fontSize: 20
    },
    countyContainer: {
      marginTop: 10
    },
    countyPicker: {
      padding: 0
    }
});

export default PlaceOrderScreen;
