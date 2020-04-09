import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import Logo from '../components/Logo';

import Colors from '../constants/Colors';
import * as cartActions from '../store/actions/cart';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems);
  const [quantity, setQuantity] = useState(1);

  // const increaseQuantityHandler = (quantity) => {
  //   setQuantity
  // }

  const addToCartHandler = useCallback(() => {
    dispatch(cartActions.addToCart(selectedProduct, quantity));
  }, [dispatch, selectedProduct, quantity]);

  // const removefromCartHandler = useCallback(() => {
  //   dispatch(cartActions.removeFromCart(productId));
  // }, [dispatch, productId])

  useEffect(() => {
    props.navigation.setParams({totalItemsCount: totalItems});
  }, [totalItems]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <Text style={styles.title}>{selectedProduct.name}</Text>
      <Text style={styles.price}>{selectedProduct.price} RON</Text>
      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
            {/* {props.deletable && ( */}
            <TouchableOpacity
              style={styles.controller}
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <Ionicons
                name={'ios-remove'}
                size={36}
                color={'white'}
              />
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.controller}
              onPress={() => 
                setQuantity(quantity + 1)
              }
            >
              <Ionicons
                name={'ios-add'}
                size={36}
                color={'white'}
              />
            </TouchableOpacity> 
          </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={addToCartHandler}>
            <View style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Adauga in Cos</Text>  
              <Ionicons
                onPress={addToCartHandler}
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={24}
                color={'white'}
              />
            </View>
        </TouchableOpacity> 
      </View>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  let itemsCount = navData.navigation.getParam('totalItemsCount');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 0,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTintColor: Colors.primary,
    headerTitle: <Logo title={'G a r d e n i a'} />,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={(itemsCount == 0) ? HeaderButton : ItemsCart}>
        <Item
          style={styles.cart}
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
  addToCartButton: {
    marginRight: 8,
    marginLeft: 24,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.accent,
    borderRadius: 8
  },
  addToCartText: {
    color: 'white'
  },
  image: {
    width: '100%',
    height: 300
  },
  cart: {
    marginRight: 4
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'montserrat'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f3',
  },
  title: {
    fontFamily: 'playfair',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    color: Colors.primary
  },
  description: {
    fontFamily: 'montserrat',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  quantityBox: {
    width: 64,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controller: {
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  quantity: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'playfair',
    paddingBottom: 8
  }
});

export default ProductDetailScreen;
