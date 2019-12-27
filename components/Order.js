import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Cart from './Cart';
import Colors from '../constants/Colors';
import Card from './Card';

const Order = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Ascunde Detalii' : 'Arata Detalii'}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <Cart
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    // fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    // fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default Order;
