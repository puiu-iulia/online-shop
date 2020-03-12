import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert, AsyncStorage, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';

import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

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

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignin, setIsSignin] = useState(true);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          email: '',
          password: ''
        },
        inputValidities: {
          email: false,
          password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
          Alert.alert('A avut loc o eroare!', error, [{ text: 'In regula' }]);
        }
      }, [error]);

    const authHandler = async () => {
      let action;
      if (!isSignin) {
        action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        );
      } else {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
      setError(null);
      try {
        setIsLoading(true);
        await dispatch(action);
        setIsLoading(false);
        if (isSignin) {
          props.navigation.navigate('ProductsOverview');
        } else {
          Toast.show('Contul tau a fost creat cu succes! Acum te poti conecta.', Toast.SHORT);
        }  
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    // const authHandler = async () => {
    //   let action;
    //   console.log(formState.inputValues.password);
    //   if (isSignin) {
    //     try {
    //       setIsLoading(true);
    //       console.log(formState.inputValues.password);
    //       await dispatch(authActions.login(
    //         formState.inputValues.email,
    //         formState.inputValues.password
    //       ));
    //       setIsLoading(false);
    //       props.navigation.navigate('ProductsOverview');
    //     } catch (err) {
    //       setError(err.message);
    //       setIsLoading(false);
    //     }    
    //   } else {
    //     try {
    //       setIsLoading(true);
    //       await dispatch(authActions.signup(
    //         formState.inputValues.email,
    //         formState.inputValues.password
    //       ));
    //       setIsLoading(false);
    //     } catch (err) {
    //       setError(err.message);
    //       setIsLoading(false);
    //     }
    //     console.log(error);
    //     // if (error) {
    //     //   Alert.alert('A avut loc o eroare!', err.message, [{ text: 'In regula' }]);
    //     // } else {
    //     //   Toast.show('Contul tau a fost creat cu succes! Acum te poti conecta.', Toast.SHORT);
    //     // }
    //   }
    // };

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
                <View style={styles.loginContainer}>
                        <Input
                            id="email"
                            placeholder=" Adresa de E-mail"
                            keyboardType="email-address"
                            required
                            email
                            style={styles.input}
                            autoFocus={true}
                            autoCapitalize="none"
                            errorText="Introdu o adresa de email valida."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id="password"
                            placeholder=" Parola"
                            keyboardType="default"
                            style={styles.input}
                            // secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorText="Introdu o parola de minim 6 caractere."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer} >
                            {isLoading ? (
                                <ActivityIndicator size='small' color={Colors.accent} />
                            ) : (
                                <Button 
                                    title={isSignin ? "Conecteaza-te": "Creaza Cont"} 
                                    color={Colors.accent}
                                    onPress={() => {
                                        authHandler();    
                                    }} 
                                /> 
                            )}
                        </View>
                        <View style={styles.text}><Text style={{fontFamily: 'montserrat', color: 'white'}}>{isSignin ? 'Nu am cont.' : 'Am deja cont.'}</Text></View>
                        <View style={styles.buttonContainer}>           
                            <Button 
                              title={isSignin? "Creaza Cont Nou": "Vreau sa ma conectez"} 
                              color={Colors.accent} 
                              onPress={() => {setIsSignin(prevState => !prevState)}} 
                            />
                        </View>  
                </View>
        </KeyboardAvoidingView> 
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Gardenia'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        width: '80%',
        // maxWidth: 600,
        maxHeight: 400,
        padding: 20,
        backgroundColor: Colors.primary
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    buttonContainer: {
        marginTop: 16,
        width: '75%',
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: 16
    },
    input: {
      fontFamily: 'montserrat',
      color: 'white'
    }
});

export default AuthScreen;
