import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const Cart = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText} numberOfLines={2}>{props.title}</Text>
        <View style={styles.amountContainer}>
          <View style={styles.quantityContainer}>
            {/* {props.deletable && ( */}
            <TouchableOpacity
              style={styles.controllers}
              onPress={props.onRemove}
            >
              <Ionicons
                name={'ios-remove'}
                size={24}
                color='white'
              />
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{props.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.controllers}
              onPress={props.onAdd}
            >
              <Ionicons
                name={'ios-add'}
                size={24}
                color='white'
              />
            </TouchableOpacity> 
          </View>
          <View style={styles.amount}>
            <Text style={styles.quantity}>{props.amount} RON</Text> 
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginVertical: 4,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    height: '25%',
    maxHeight: 120,
    backgroundColor: '#f1f1f3'
  },
  imageContainer: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  itemData: {
    justifyContent: 'space-evenly',
    marginLeft: 16
  },
  quantity: {
    fontFamily: 'montserrat',
    color: '#888',
    fontSize: 16
  },
  amountContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8
  },
  mainText: {
    marginTop: 24,
    fontFamily: 'playfair',
    fontSize: 18
  },
  amount: {
    marginLeft: 16,
    alignContent: 'center'
  },
  controllers: {
    height: 32,
    width: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08292F'
  },
  quantityBox: {
   marginHorizontal: 16
  }
});

export default Cart;