import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation-switch-transitioner';
import { Platform, Button, View, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import ProductsListScreen from '../screens/ProductsListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import StartupScreen from '../screens/StartupScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';


const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'playfair'
    },
    headerBackTitleStyle: {
      fontFamily: 'playfair'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };

  const ProductsNavigator = createStackNavigator(
    {
      ProductsOverview: ProductsListScreen,
      ProductDetail: ProductDetailsScreen,
      Cart: CartScreen, 
      Order: PlaceOrderScreen,
      OrderConfirmation: OrderConfirmationScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-flower' : 'ios-flower'}
            size={24}
            color={drawerConfig.tintColor}
          />
        ),
        drawerLabel: "Toate Produsele",
        labelStyle: {
          color: 'white'
        }
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );

  const UserNavigator = createStackNavigator(
    {
      UserProfile: UserProfileScreen,
      PreviousOrders: OrdersScreen,
      OrderDetls: OrderDetailsScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <FontAwesome
            name={'user'}
            size={24}
            color={Colors.accent}
          />
          // <View>if ()</View>
        ),
        drawerLabel: "Contul Meu",
        labelStyle: {
          color: 'white'
        }
      },

      defaultNavigationOptions: defaultNavOptions
    }
  );



  const ShopNavigator = createDrawerNavigator(
    {
      Produse: ProductsNavigator,
      Profil: UserNavigator, 
    },
    // {
    //   drawerBackgroundColor: Colors.primary
    // },
    {
      drawerBackgroundColor: Colors.primary,
      contentOptions: {
        labelStyle: {
          color: 'white'
        },
        activeTintColor: Colors.accent
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        // const getData = async () => {
        //   const userData = await AsyncStorage.getItem('userData');
        // };
        // getData();
        // console.log(userData);
        const isSignedIn = useSelector(state => state.auth.isSignedIn);
        console.log(isSignedIn);
        return (
          <View style={{ flex: 1, paddingTop: 20, flexDirection: 'column' }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={{height: '35%', width: '70%', marginLeft: 16, marginBottom: 32}}>
                <Image
                      style={{height: '100%', width: '100%', margin: 16}}
                      source={require('../assets/logoalb.png')}
                />
              </View>
              <DrawerItems {...props} />
              {(!isSignedIn) ? (<View style={{alignContent: 'flex-end'}}><Button
                title="Conecteaza-te"
                color={Colors.primary}
                onPress={() => {
                  // dispatch(authActions.logout());
                  props.navigation.navigate('AuthScreen');
                }}
              /></View>) : (
                <Button
                  title="Deconecteaza-te"
                  color={Colors.primary}
                  onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('AuthScreen');
                  }}
                />)}   
            </SafeAreaView>
          </View>
        );
      }
    }
  );

  const AuthNavigator = createStackNavigator(
    {
      AuthScreen: AuthScreen
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );

  const StartupNavigator = createStackNavigator(
    {
      StartupsScreen: StartupScreen,
      Welcome: WelcomeScreen
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  )

  const MainNavigator = createSwitchNavigator({
      Shop: ShopNavigator,
      Auth: AuthNavigator,
      Startup: StartupNavigator
    },
    {
      initialRouteName: 'Startup'
    }
  );

  export default createAppContainer(MainNavigator);