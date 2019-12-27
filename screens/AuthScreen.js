import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

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
    const [isSignup, setIsSignup] = useState(true);
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
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
          action =  authActions.signup(
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
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
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
                            id="password"
                            label="Parola"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={8}
                            autoCapitalize="none"
                            errorText="Introdu o parola de minim 8 caractere."
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer} >
                            {isLoading ? (
                                <ActivityIndicator size='small' color={Colors.primary} />
                            ) : (
                                <Button 
                                    title={isSignup ? "Creaza Cont": "Conecteaza-te"} 
                                    color={Colors.accent} 
                                    onPress={authHandler} 
                                /> 
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                              title={isSignup ? "Vreau sa ma conectez": "Vreau sa imi creez cont"} 
                              color={Colors.primary} 
                              onPress={() => {setIsSignup(prevState => !prevState)}} 
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
