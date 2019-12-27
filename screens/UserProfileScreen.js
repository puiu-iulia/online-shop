import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const UserProfileScreen = props => {
  return (
    <ScrollView>
      <View style={styles.dataContainer}>
        <View style={styles.nameContainer}>
          <Text>Nume:</Text>
          <Text>Nume Prenume</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text>Email:</Text>
          <Text>Nume@yahoo.com</Text>
        </View>
        <View style={styles.ordersButton}>
          <Button 
              color={Colors.primary}
              title="Editeaza"
              onPress={() => {
                
              }} 
          />
        </View>   
      </View>
      <View style={styles.ordersButton}>
        <Button
            color={Colors.primary}
            title="Deconecteaza-te"
            onPress={() => {
              
            }} 
        />
      </View>
      <View style={styles.ordersButton}>
        <Button
            color={Colors.primary}
            title="Vezi Comenzi Anterioare"
            onPress={() => {
              props.navigation.navigate('PreviousOrders', {route: 'User'});
            }} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    borderColor: Colors.primary,
    padding: 8,
    margin: 8,
    elevation: 4
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8
  },
  ordersButton: {
    marginHorizontal: 32,
    marginVertical: 8
  }
});

UserProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: "Profilul Meu",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
          onPress={() => {
            navData.navigation.navigate('ProductsOverview');
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProfileScreen;

