import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Cart from './Cart';
import Colors from '../constants/Colors';
import Card from './Card';

const Order = props => {

  return (
    <Card style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.date}>{props.date}</Text>
          <Text style={styles.totalAmount}> - </Text>
          <Text style={styles.totalAmount}>{props.amount} RON</Text>
          <Button
            color={Colors.accent}
            title={'Arata Detalii'}
            onPress={props.onSelect}
          />
        </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#f1f1f3'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'montserrat',
    fontSize: 16,
    color: '#888'
  },
  date: {
    fontSize: 16,
    fontFamily: 'montserrat',
  }
});

export default Order;
