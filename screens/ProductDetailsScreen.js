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
import { FontAwesome } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
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
      <Text style={styles.description}>{selectedProduct.description}</Text>
      <Text style={styles.price}>{selectedProduct.price} RON</Text>
      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
            {/* {props.deletable && ( */}
            <TouchableOpacity
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <FontAwesome
                name={Platform.OS === 'android' ? 'minus-circle' : 'minus-circle'}
                size={36}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => 
                setQuantity(quantity + 1)
              }
            >
              <FontAwesome
                name={Platform.OS === 'android' ? 'plus-circle' : 'plus-circle'}
                size={36}
                color={Colors.primary}
              />
            </TouchableOpacity> 
          </View>
        <Button
          color={Colors.accent}
          title="Adauga in cos"
          onPress={addToCartHandler}
        />
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  let itemsCount = navData.navigation.getParam('totalItemsCount');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 12,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={(itemsCount == 0) ? HeaderButton : ItemsCart}>
        <Item
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
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    // fontFamily: 'open-sans-bold'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    // fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  quantityBox: {
    paddingHorizontal: 16
   }
});

export default ProductDetailScreen;
