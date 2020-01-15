import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Cart from './Cart';
import Colors from '../constants/Colors';
import Card from './Card';

const Order = props => {

  return (
    <Card style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>{props.amount} RON</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button
          color={Colors.primary}
          title={'Arata Detalii'}
          onPress={props.onSelect}
        />
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f5e296'
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
  }
});

export default Order;
