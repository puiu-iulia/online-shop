import React, {useState} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import Logo from '../components/Logo';
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
        imageUrl: state.cart.items[key].imageUrl,
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
            image={itemData.item.imageUrl}
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
      <View style={styles.summaryContainer}>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Subtotal:{' '}
          </Text>
          <Text style={styles.amount}>
            {Math.round(cartTotalAmount * 100) / 100} RON
          </Text>  
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Livrare:{' '}
          </Text>
          <Text style={styles.amount}>
            0 RON
          </Text>  
        </View>
        <View style={styles.summaryTotal}>
          <Text style={styles.summaryText}>
            Total:{' '}
          </Text>
          <Text style={styles.amount}>
            {Math.round(cartTotalAmount * 100) / 100} RON
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.accent}
          title="TRIMITE COMANDA"
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: Colors.primary,
  headerTitle: <Logo title={'Cos de Cumparaturi'} style={{textTransform: 'none'}} />,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 8
  },
  summaryContainer: {
    justifyContent: 'flex-end',
    marginTop: 16
  },
  summary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  summaryTotal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 16,
    borderTopColor: '#888',
    borderTopWidth: 1,
  },
  summaryText: {
    fontFamily: 'montserrat',
    fontSize: 14
  },
  amount: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'montserrat'
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 8,
    justifyContent: 'center',
    borderRadius: 8,
    width: '50%',
    overflow: 'hidden'
  }
});

export default CartScreen;
