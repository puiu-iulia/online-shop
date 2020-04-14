import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  Text, 
  ScrollView,
  Button
} from 'react-native';
import { useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';
import CustomLinearGradient from '../components/CustomLinearGradient';

const StartupScreen = props => {
  const [policyChecked, setPolicyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handlePress = (policyChecked, termsChecked) => {
    if (policyChecked && termsChecked) {
      AsyncStorage.setItem(
        'userChecks',
        JSON.stringify({
          termsChecked: termsChecked,
          policyChecked: policyChecked
        })
      );
    }
  };

  return (
    <View style={styles.screen}>
        <View style={{height: '30%', width: '60%', alignSelf: 'center', marginRight: 16}}>
          <Image
                style={{height: '100%', width: '100%', marginBottom: 8}}
                source={require('../assets/logoalb.png')}
          />
        </View>
          <ScrollView>
              <View style={styles.checkBoxesContainer} >
                  <CheckBox 
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTextStyle}     
                    checkedColor={Colors.accent}
                    checked={termsChecked}
                    checkedIcon={'check-square-o'}
                    onIconPress={() => {
                      setTermsChecked(true);
                    }}
                    title='Sunt de acord cu Termenii si Conditiile de Utilizare '
                  />
                  <CustomLinearGradient />
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTextStyle}
                    checkedColor={Colors.accent}
                    checked={policyChecked}
                    onIconPress={() => {
                      setPolicyChecked(true);
                      handlePress(policyChecked, termsChecked);
                    }}    
                    title='Sunt de acord cu prelucrarea datelor cu caracter personal si Politica de Confidentialitate'
                  />
                  <CustomLinearGradient />
              </View>  
              <View style={styles.buttonContainer}>
                  <Button 
                    title={"Conecteaza-te"} 
                    color={Colors.accent}
                    disabled={!termsChecked || !policyChecked} 
                    onPress={() => {
                        props.navigation.navigate('AuthScreen');}} 
                  />
              <Button 
                  title={"Spre Magazin"} 
                  color={Colors.accent}
                  disabled={!termsChecked || !policyChecked}  
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
