import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { withBadge } from 'react-native-elements';

import HeaderButton from '../components/HeaderButton';
import Logo from '../components/Logo';
import CustomLinearGradient from '../components/CustomLinearGradient';
import Colors from '../constants/Colors';
import UserDataItem from '../components/UserDataItem';
import * as userActions from '../store/actions/user';
import * as authActions from '../store/actions/auth';
import * as orderActions from '../store/actions/orders';
import { hide } from 'expo/build/launch/SplashScreen';

const UserProfileScreen = props => {

  const [userError, setUserError] = useState();
  const [error, setError] = useState();
  const totalItems = useSelector(state => state.cart.totalItems);
  const isUserLoading = useSelector(state => state.user.isLoading);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
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
        <ActivityIndicator size='large' color={Colors.accent} />
      </View>
    );
  }

  if (!isSignedIn || user === null) {
    return (
      <View style={styles.centered}>
        <Text style={{fontFamily: 'montserrat', color: Colors.iron, fontSize: 16}}> Nu esti conectat.</Text>
        <Button
          style={{margin: 16}}
          title="Conecteaza-te" 
          onPress={() => {
            props.navigation.navigate('AuthScreen');
          }}
          color={Colors.accent}
        />
      </View>
    )
  }

  if (isSignedIn && user && user.billingName === " ") {
    return (
      <View style={styles.centered}>
        <Text style={{fontFamily: 'montserrat', color: Colors.iron, fontSize: 16, marginHorizontal: 24, textAlign: 'center'}}>Dupa ce vei plasa prima comanda, datele tale vor aparea aici.</Text>
      </View>
    );
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
        <ScrollView>
          <View style={styles.dataContainer}>   
            <Text style={styles.nameText}>{user.billingName}</Text>
            <CustomLinearGradient /> 
            <UserDataItem
              smallText={'Adresa de e-mail'}
              bigText={email}>
            </UserDataItem>
            <UserDataItem
              smallText={'Nr. de telefon'}
              bigText={user.billingPhone}>
            </UserDataItem>
            <View style={styles.billingText}>
              <Text style={styles.text}>Adresa de Facturare: </Text>
            </View>
            <CustomLinearGradient /> 
            <UserDataItem
              smallText={'Adresa:'}
              bigText={user.billingAddress}>
            </UserDataItem>
            <UserDataItem
              smallText={'Localitate:'}
              bigText={user.billingCity}>
            </UserDataItem>
            <UserDataItem
              smallText={'Judet:'}
              bigText={user.billingCounty}>
            </UserDataItem>  
          </View>
          <CustomLinearGradient /> 
          <View style={styles.buttonsContainer}>
            <View style={styles.ordersButton}>
              <Button
                  color={Colors.accent}
                  title="Comenzile Mele"
                  onPress={() => {
                    props.navigation.navigate('PreviousOrders');
                  }} 
              />
            </View>
            <View style={styles.ordersButton}>
              <Button
                  color={'#888'}
                  title="Deconecteaza-te"
                  onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('ProductsOverview');
                  }} 
              />
            </View>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.primary
  },
  billingText: {
    marginVertical: 8,
    flex: 1
  },
  centered: {
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tiber
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  dataContainer: {
    flex: 1,
    // width: '100%',
    // maxWidth: 340,
    // minWidth: '90%',
    // height: '75%',
    // maxHeight: 380,
    padding: 8,
    margin: 8,
  },
  ordersButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden'
  },
  cart: {
    marginRight: 4
  },
  text: {
    fontFamily: 'montserrat', 
    color: 'white'
  },
  nameText: {
    fontFamily: 'playfair',
    fontSize: 24,
    color: 'white'
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
    headerTitle: <Logo title={'Profilul meu'} style={{textTransform: 'none'}}/>,
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          color={Colors.iron}
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
          color={Colors.iron}
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

