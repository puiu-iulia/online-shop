import React, {useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import Cart from '../components/Cart';
import Card from '../components/Card';
import * as cartActions from '../store/actions/cart';
import * as ordersActions from '../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    // await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    props.navigation.navigate('Order', {totalAmount: cartTotalAmount});
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <Cart
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onAdd={() => {
              dispatch(cartActions.addQuantity(itemData.item.productId));
            }}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            {Math.round(cartTotalAmount * 100) / 100} RON
          </Text>
        </Text>
        {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) : 
          ( <Button
            color={Colors.accent}
            title="TRIMITE COMANDA"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          /> )
        }
      </Card>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Cos de Cumparaturi'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10
  },
  summaryText: {
    // fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
