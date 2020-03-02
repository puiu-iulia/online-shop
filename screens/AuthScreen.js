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
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
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

    // const authHandler = async () => {
    //   let action;
    //   if (!isSignin) {
    //     action = authActions.signup(
    //       formState.inputValues.email,
    //       formState.inputValues.password
    //     );
    //   } else {
    //     action = authActions.login(
    //       formState.inputValues.email,
    //       formState.inputValues.password
    //     );
    //   }
    //   setError(null);
    //   try {
    //     setIsLoading(true);
    //     await dispatch(action);
    //     setIsLoading(false);
    //     if (isSignin) {
    //       props.navigation.navigate('ProductsOverview');
    //     } else {
    //       Toast.show('Contul tau a fost creat cu succes! Acum te poti conecta.', Toast.SHORT);
    //     }  
    //   } catch (err) {
    //     setError(err.message);
    //     setIsLoading(false);
    //   }
    // };

    const authHandler = async () => {
      let action;
      if (!isSignin) {
        try {
          setIsLoading(true);
          await dispatch(authActions.signup(
            formState.inputValues.email,
            formState.inputValues.password
          ));
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
        console.log(error);
        // if (error) {
        //   Alert.alert('A avut loc o eroare!', err.message, [{ text: 'In regula' }]);
        // } else {
        //   Toast.show('Contul tau a fost creat cu succes! Acum te poti conecta.', Toast.SHORT);
        // }
        
      } else {
        try {
          setIsLoading(true);
          await dispatch(authActions.login(
            formState.inputValues.email,
            formState.inputValues.password
          ));
          setIsLoading(false);
          props.navigation.navigate('ProductsOverview');
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      }
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
            <LinearGradient colors={['#f5e296', '#926b14']} style={styles.gradient}>
                <Card style={styles.loginContainer}>
                    <ScrollView>
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
                            value={password}
                            label="Parola"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorText="Introdu o parola de minim 6 caractere."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer} >
                            {isLoading ? (
                                <ActivityIndicator size='small' color={Colors.primary} />
                            ) : (
                                <Button 
                                    title={isSignin ? "Conecteaza-te": "Creaza Cont"} 
                                    color={Colors.accent}
                                    onPress={() => {
                                      if (formState.inputValues.email == "") {
                                        // console.log(formState.inputValues.email);
                                        Alert.alert('Te rugam sa introduci datele tale');
                                      } else {
                                        authHandler();
                                      }
                                      
                                    }} 
                                /> 
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.text}><Text>{isSignin ? 'Nu am cont.' : 'Am deja cont.'}</Text></View>
                            <Button 
                              title={isSignin? "Vreau sa imi creez cont": "Vreau sa ma conectez"} 
                              color={Colors.primary} 
                              onPress={() => {setIsSignin(prevState => !prevState)}} 
                            />
                        </View>  
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
       
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Gardenia'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    loginContainer: {
        width: '80%',
        // maxWidth: 600,
        maxHeight: 400,
        padding: 20
    },
    text: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    buttonContainer: {
        marginTop: 16
    }
});

export default AuthScreen;
