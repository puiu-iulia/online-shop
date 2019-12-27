import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const Cart = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.mainText} numberOfLines={2}>{props.title}</Text>
        <Text style={styles.quantity}> x </Text>
          <View style={styles.quantityContainer}>
            {/* {props.deletable && ( */}
            <TouchableOpacity
              onPress={props.onRemove}
              style={styles.deleteButton}
            >
              <FontAwesome
                name={Platform.OS === 'android' ? 'minus-circle' : 'minus-circle'}
                size={36}
                color='#08292F'
              />
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{props.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={props.onAdd}
              style={styles.deleteButton}
            >
              <FontAwesome
                name={Platform.OS === 'android' ? 'plus-circle' : 'plus-circle'}
                size={36}
                color='#08292F'
              />
            </TouchableOpacity> 
          </View>
      </View>
      <View style={styles.amount}>
        <Text style={styles.quantity}>= {props.amount} RON</Text> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginVertical: 4,
    backgroundColor: 'white',
    borderBottomColor: '#08292F',
    borderBottomWidth: 0.5
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quantity: {
    // fontFamily: 'open-sans',
    color: '#888',
    fontSize: 18
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainText: {
    // fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  amount: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  deleteButton: {
    // marginLeft: 20
  },
  quantityBox: {
   paddingHorizontal: 12
  }
});

export default Cart;