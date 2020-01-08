import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { withBadge } from 'react-native-elements';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Card from '../components/Card';

const UserProfileScreen = props => {

  const totalItems = useSelector(state => state.cart.totalItems);

  useEffect(() => {
    props.navigation.setParams({totalItems: totalItems});
  }, [totalItems]);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#f5e296', '#926b14']} style={styles.gradient}>
        <ScrollView>
          <Card style={styles.dataContainer}>
            <View style={styles.centered}>
              <Text>Date Personale: </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text>Nume: </Text>
              <Text>Nume Prenume</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text>Email: </Text>
              <Text>Nume@yahoo.com</Text>
            </View>
            <View style={styles.centered}>
              <Text>Adresa de Facturare: </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text>Str. Oituz</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text>Localitate: Onesti</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text>Judet: Bacau</Text>
            </View>   
          </Card>
          <View style={styles.buttonsContainer}>
            <View style={styles.ordersButton}>
              <Button
                  color={Colors.primary}
                  title="Vezi Comenzi Anterioare"
                  onPress={() => {
                    props.navigation.navigate('PreviousOrders', {route: 'User'});
                  }} 
              />
            </View>
            <View style={styles.ordersButton}>
              <Button
                  color={Colors.primary}
                  title="Deconecteaza-te"
                  onPress={() => {
                    
                  }} 
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  centered: {
    marginVertical: 8,
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  dataContainer: {
    flex: 1,
    // width: '100%',
    // maxWidth: 340,
    minWidth: '90%',
    height: '75%',
    maxHeight: 380,
    borderColor: Colors.primary,
    padding: 8,
    margin: 8,
    elevation: 4,
    backgroundColor: 'white'
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8
  },
  ordersButton: {
    marginHorizontal: 32,
    marginVertical: 8
  },
  cart: {
    marginRight: 4
  }
});

UserProfileScreen.navigationOptions = navData => {
  const itemsCount = navData.navigation.getParam('totalItems');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 12,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);

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
      <HeaderButtons 
      HeaderButtonComponent={(itemsCount == 0) ? HeaderButton : ItemsCart}
      >
        <Item
          style={styles.cart}
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

