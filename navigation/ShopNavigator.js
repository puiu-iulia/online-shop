import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation-switch-transitioner';
import { Platform, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsListScreen from '../screens/ProductsListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import StartupScreen from '../screens/StartupScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    // headerTitleStyle: {
    //   fontFamily: 'open-sans-bold'
    // },
    // headerBackTitleStyle: {
    //   fontFamily: 'open-sans'
    // },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  };

  const ProductsNavigator = createStackNavigator(
    {
      ProductsOverview: ProductsListScreen,
      ProductDetail: ProductDetailsScreen,
      Cart: CartScreen, 
      Order: PlaceOrderScreen
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
        drawerLabel: "Toate Produsele"
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
            color={drawerConfig.tintColor}
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
      PreviousOrders: OrdersScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={24}
            color={drawerConfig.tintColor}
          />
          // <View>if ()</View>
        ),
        drawerLabel: "Profilul Meu"
      },

      defaultNavigationOptions: defaultNavOptions
    }
  );

  const ShopNavigator = createDrawerNavigator(
    {
      Produse: ProductsNavigator,
      Comenzi: OrdersNavigator,
      Profil: UserNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Conecteaza-te"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
  );

  const AuthNavigator = createStackNavigator(
    {
      Auth: AuthScreen
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );

  const MainNavigator = createSwitchNavigator({
    Shop: ShopNavigator,
    Auth: AuthNavigator
  });

  export default createAppContainer(MainNavigator);