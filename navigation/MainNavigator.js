import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation-switch-transitioner';
import { Platform, Button, View, AsyncStorage } from 'react-native';
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

  const OrdersNavigator = createStackNavigator(
    {
      Orders: OrdersScreen,
      OrderDetails: OrderDetailsScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={24}
            color={Colors.accent}
          />
        ), 
        drawerLabel: "Comenzi Anterioare"
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
        drawerLabel: "Profilul Meu",
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
        const isSignedIn = useSelector(state => state.auth.isSignedIn);
        return (
          <View style={{ flex: 1, paddingTop: 20, flexDirection: 'column' }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
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
                  color={Colors.accent}
                  onPress={() => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('ProductsOverview');
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
      StartupsScreen: StartupScreen
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
      initialRouteName: 'Shop'
    }
  );

  export default createAppContainer(MainNavigator);