import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { Image, StyleSheet, View, Dimensions, KeyboardAvoidingView, Button, ActivityIndicator, Alert, AsyncStorage} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import { useTheme } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//     if (action.type === FORM_INPUT_UPDATE) {
//       const updatedValues = {
//         ...state.inputValues,
//         [action.input]: action.value
//       }; 
//       return {
//         inputValues: updatedValues
//       };
//     }
//     return state;
// };

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignin, setIsSignin] = useState(true);
    const [username, setUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch();

    const getUserCredentials = async () => {
      const userCredentials = await AsyncStorage.getItem('userCredentials');
      if (userCredentials) {
        const transformedData = JSON.parse(userCredentials);
        const { usernameData, userPasswordData } = transformedData;
        if (usernameData != '' && userPasswordData != '') {
          setUsername(usernameData);
          setUserPassword(userPasswordData);
        }            
      }   
    }

    useEffect(() => {
      getUserCredentials();
      // console.log(username, userPassword, 'credentials');
    }, [username, userPassword]);
   


    // const [formState, dispatchFormState] = useReducer(formReducer, {
    //     inputValues: {
    //       email: username ? username : '',
    //       password: userPassword ? userPassword : ''
    //     }
    // });


    useEffect(() => {
        if (error) {
          Alert.alert('A avut loc o eroare!', error, [{ text: 'In regula' }]);
        }
      }, [error]);

    const authHandler = async () => {
      let action;
      if (!isSignin) {
        action = authActions.signup(
          username,
          userPassword
        );
      } else {
        action = authActions.login(
          username,
          userPassword
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
          Alert.alert('Contul tau a fost creat cu succes!', 'Acum te poti conecta.', [{ text: 'In regula' }]);
          setIsSignin(true);
        }  
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    // const inputChangeHandler = useCallback(
    //     (inputIdentifier, inputValue ) => {
    //       dispatchFormState({
    //         type: FORM_INPUT_UPDATE,
    //         value: inputValue,
    //         input: inputIdentifier
    //       });
    //     },
    //     [dispatchFormState]
    //   );

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
          <ScrollView>
                 <View style={styles.imageView}>
                  <Image
                        style={styles.image}
                        source={require('../assets/logoalb.png')}
                  />
                </View>
                <View style={styles.loginContainer}>
                        <Input
                            id="email"
                            placeholder=" Adresa de E-mail"
                            keyboardType="email-address"
                            value={username}
                            // email
                            style={styles.input}
                            autoCapitalize="none"
                            errorText="Introdu o adresa de email valida."
                            // onInputChange={inputChangeHandler}
                            onChangeText={(username) => {
                              setUsername(username);
                            }}
                            initialValue={(username != '') ? username : ''}
                        />
                        <Input
                            id="password"
                            placeholder=" Parola"
                            keyboardType="default"
                            style={styles.input}
                            value={userPassword}
                            secureTextEntry
                            minLength={6}
                            autoCapitalize="none"
                            errorText="Introdu o parola de minim 6 caractere."
                            // onInputChange={inputChangeHandler}
                            onChangeText={(userPassword) => {
                              setUserPassword(userPassword);
                            }}
                            initialValue={(userPassword != '') ? userPassword : ''}
                        />
                        <View style={styles.buttonContainer} >
                            {isLoading ? (
                               <ActivityIndicator size='large' color={Colors.accent} />
                            ) : (
                                <Button
                                    disabled={(username.length == 0) || (userPassword.length == 0)} 
                                    title={isSignin ? "Conecteaza-te": "Creaza Cont"} 
                                    color={Colors.accent}
                                    onPress={() => {
                                        authHandler();    
                                    }} 
                                /> 
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                          <Button 
                            title={isSignin? "Vreau sa creez cont nou": "Vreau sa ma conectez"} 
                            color={Colors.accent} 
                            onPress={() => {setIsSignin(prevState => !prevState)}} 
                          />                      
                        </View>
                        <View style={styles.buttonContainer} >
                              <Button
                                title={"Spre Magazin"} 
                                color={Colors.accent} 
                                onPress={() => {props.navigation.navigate('ProductsOverview');}} 
                              />
                            </View>    
                </View>
                </ScrollView>
        </KeyboardAvoidingView> 
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24
    },
    loginContainer: {
        width: '100%',
        // maxWidth: 600,
        maxHeight: 400,
        padding: 20
    },
    imageView: {
      height: (Dimensions.get('window').width/1.1)/1.66, 
      width: Dimensions.get('window').width/1.1, 
      alignSelf: 'center', 
      marginBottom: 48
    },
    image: {
      height: '100%', 
      width: '100%',
      marginVertical: 48
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

AuthScreen.navigationOptions = {
  header: null
}

export default AuthScreen;
