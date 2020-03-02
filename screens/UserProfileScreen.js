import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { withBadge } from 'react-native-elements';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import * as userActions from '../store/actions/user';
import * as authActions from '../store/actions/auth';
import * as orderActions from '../store/actions/orders';

const UserProfileScreen = props => {

  const [userError, setUserError] = useState();
  const [error, setError] = useState();
  const totalItems = useSelector(state => state.cart.totalItems);
  const isUserLoading = useSelector(state => state.user.isLoading);
  const isOrderLoading = useSelector(state => state.orders.isLoading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const orders = useSelector(state => state.orders.orders);
  const lastOrder = orders[0];
  console.log(lastOrder);
  const user = useSelector(state => state.user.user);
  const email = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({totalItems: totalItems});
  }, [totalItems]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        await dispatch(userActions.getUser());
      } catch (err) {
        setUserError(err.message);
      };
    };
    loadUser();    
  }, [dispatch]);

  if (isSignedIn && isUserLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isSignedIn || user === null) {
    return (
      <View style={styles.centered}>
        <Text>Nu esti conectat.</Text>
        <Button
          title="Conecteaza-te" 
          onPress={() => {
            props.navigation.navigate('AuthScreen');
          }}
          color={Colors.primary}
        />
      </View>
    )
  }

  
  // if (products === null)  {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>Nu s-au gasit produse. Incercati mai tarziu.</Text>
  //     </View>
  //   );
  // }

  if (userError || error) {
    return (
      <View style={styles.centered}>
        <Text>A avut loc o eroare.</Text>
        <Button
          title="Incearca din nou" 
          onPress={() => {
            // loadUser();
          }}
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#f5e296', '#926b14']} style={styles.gradient}>
        <ScrollView>
          <Card style={styles.dataContainer}>
            <View style={styles.centered}>
              <Text style={styles.text}>Date Personale: </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Nume: </Text>
              <Text style={styles.text}>{user.billingName}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Email: </Text>
              <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Nr. de telefon: </Text>
              <Text style={styles.text}>{user.billingPhone}</Text>
            </View>
            <View style={styles.centered}>
              <Text style={styles.text}>Adresa de Facturare: </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Adresa: {user.billingAddress}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Localitate: {user.billingCity}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.text}>Judet: {user.billingCounty}</Text>
            </View>   
          </Card>
          <View style={styles.buttonsContainer}>
            <View style={styles.ordersButton}>
              <Button
                  color={Colors.primary}
                  title="Vezi Comenzi Anterioare"
                  onPress={() => {
                    props.navigation.navigate('PreviousOrders');
                  }} 
              />
            </View>
            <View style={styles.ordersButton}>
              <Button
                  color={Colors.primary}
                  title="Deconecteaza-te"
                  onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('ProductsOverview');
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
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  text: {
    fontFamily: 'montserrat'
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

