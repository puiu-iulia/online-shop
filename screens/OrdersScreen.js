import React, { useEffect, useState } from 'react';
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';

import HeaderButton from '../components/HeaderButton';
import Order from '../components/Order';
import * as orderActions from '../store/actions/orders';
import Colors from '../constants/Colors';

const OrdersScreen = props => {
  const isLoading = useSelector(state => state.orders.isLoading);
  const orders = useSelector(state => state.orders.orders);
  const totalItems = useSelector(state => state.cart.totalItems);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({totalItems: totalItems});
  }, [totalItems]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await dispatch(orderActions.fetchOrders());
      } catch (err) {
        setError(err.message);
      };
    };
    loadOrders();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (orders === null) {
    return (
      <View style={styles.centered}>
        <Text>Nu s-au gasit comenzi. </Text>
      </View>
    );
  }

  const selectItemHandler = (id) => {
    props.navigation.navigate('OrderDetails', {
      orderId: id,
    });
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <Order
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
          onSelect={() => {
            selectItemHandler(itemData.item.id);
          }}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  const itemsCount = navData.navigation.getParam('totalItems');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 0,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerTitle: 'Comenzile Tale',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Back"
          iconName={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
          onPress={() => {
            // console.log(navData.navigation);
            if (navData.navigation.getParam('route') === 'User') {
              navData.navigation.navigate('UserProfile');
            } else {
              navData.navigation.navigate('ProductsOverview');
            }  
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons 
      HeaderButtonComponent={(itemsCount == 0) ? HeaderButton : ItemsCart}
      >
        <Item
          style={styles.car}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  cart: {
    marginRight: 4
  }
})

export default OrdersScreen;
