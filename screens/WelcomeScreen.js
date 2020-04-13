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
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';
import CustomLinearGradient from '../components/CustomLinearGradient';

const StartupScreen = props => {
  const dispatch = useDispatch();

//   useEffect(() => {
//     const tryLogin = async () => {
//       const userData = await AsyncStorage.getItem('userData');
//       const transformedData = JSON.parse(userData);
//       const { token, userId, } = transformedData;   
//       dispatch(authActions.login(userId, token, ));
//       props.navigation.navigate('Shop');
//     };

//     tryLogin();
//   }, [dispatch]);

  return (
    // <View style={styles.screen}>s
    //   <ActivityIndicator size="large" color={Colors.primary} />
    // </View>
    <View style={styles.screen}>
        <View style={{height: '30%', width: '60%', alignSelf: 'center'}}>
          <Image
                style={{height: '100%', width: '100%', margin: 16}}
                source={require('../assets/logoalb.png')}
          />
        </View>
          <ScrollView>
              <View style={styles.checkBoxesContainer} >
                  <CheckBox 
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTextStyle}     
                    checkedColor={Colors.accent}
                    checkedIcon={'check-square-o'}
                    title='Sunt de acord cu Termenii si Conditiile de Utilizare '
                  />
                  <CustomLinearGradient />
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTextStyle}
                    checkedColor={Colors.accent}    
                    title='Sunt de acord cu prelucrarea datelor cu caracter personal si Politica de Confidentialitate'
                  />
                  <CustomLinearGradient />
              </View>  
              <View style={styles.buttonContainer}>
                  <Button 
                    title={"Conecteaza-te"} 
                    color={Colors.accent} 
                    onPress={() => {
                        props.navigation.navigate('AuthScreen');}} 
                  />
              <Button 
                  title={"Spre Magazin"} 
                  color={Colors.accent} 
                  onPress={() => {
                      props.navigation.navigate('ProductsOverview');}} 
                  />
              </View>  
          </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  checkBoxesContainer: {
    margin: 24,
  },
  checkBoxContainer: {
    backgroundColor: Colors.primary,
    marginVertical: 24,
    borderColor: Colors.primary
  },
  checkBoxTextStyle: {
    fontFamily: 'montserrat',
    color: Colors.iron
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default StartupScreen;
