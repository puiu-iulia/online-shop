import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Button,
  Dimensions
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Linking } from 'expo';

import Colors from '../constants/Colors';
import CustomLinearGradient from '../components/CustomLinearGradient';

const WelcomeScreen = props => {
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
        <View style={styles.imageView}>
          <Image
                style={styles.image}
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
                    size={32}
                    onPress={() => Linking.openURL('https://gardenia.ro/index.php/termeni-si-conditii/')}
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
                    size={32}
                    onPress={() => Linking.openURL('https://gardenia.ro/index.php/politica-cookie/')}
                    onIconPress={() => {
                      setPolicyChecked(true);
                    }}    
                    title='Sunt de acord cu prelucrarea datelor cu caracter personal si Politica de tip Cookie'
                  />
                  <CustomLinearGradient />
              </View>  
              <View style={styles.buttonContainer}>
                  <Button 
                    title={"Conecteaza-te"} 
                    color={Colors.accent}
                    disabled={!termsChecked || !policyChecked} 
                    onPress={() => {
                        handlePress(policyChecked, termsChecked);
                        props.navigation.navigate('AuthScreen');}} 
                  />
              <Button 
                  title={"Spre Magazin"} 
                  color={Colors.accent}
                  disabled={!termsChecked || !policyChecked}  
                  onPress={() => {
                      handlePress(policyChecked, termsChecked);
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
  imageView: {
    height: Dimensions.get('window').height/3.4, 
    width: Dimensions.get('window').width/1.2, 
    alignSelf: 'center', 
    marginVertical: 48
  },
  image: {
    height: '100%', 
    width: '100%',
    marginVertical: 48
  },
  checkBoxesContainer: {
    margin: 16,
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

WelcomeScreen.navigationOptions = {
    header: null
}

export default WelcomeScreen;
