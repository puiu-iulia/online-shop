import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Picker
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import Logo from '../components/Logo';

import Colors from '../constants/Colors';
import * as cartActions from '../store/actions/cart';
import * as variationActions from '../store/actions/variation';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems);
  const variations = useSelector(state => state.variation.availableVariations);
  const [quantity, setQuantity] = useState(1);
  const [variationOption, setVariationOption] = useState('Selecteaza');
  const variation = variations.find((variation => variation.option === 'Selecteaza'));
  console.log(variation);
  const [variationId, setVariationId] = useState();
  const [price, setPrice] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadVariations = async () => {
      try {
        await dispatch(variationActions.fetchVariations(productId));
      } catch (err) {
        setError(err.message);
      };
    };
    loadVariations();
    setIsLoading(false);
  }, [dispatch]);

  // const increaseQuantityHandler = (quantity) => {
  //   setQuantity
  // }

  const updatePrice = (varOption) => {
    for (const key in variations) {
      if (variations[key].option === varOption) {
        setPrice(variations[key].price);
        setVariationId(variations[key].id);
        // console.log(variations);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../assets/loading.gif')}
        />
      </View>
    );
  }

  const addToCartHandler = useCallback(() => {

    dispatch(cartActions.addToCart(selectedProduct, price, quantity, variationOption, productId, variationId));
  }, [dispatch, selectedProduct, price, quantity, variationOption, productId, variationId]);

  // const removefromCartHandler = useCallback(() => {
  //   dispatch(cartActions.removeFromCart(productId));
  // }, [dispatch, productId])

  // useEffect(() => {
  //   props.navigation.setParams({varId: varId});
  // }, [varId]);


  useEffect(() => {
    props.navigation.setParams({totalItemsCount: totalItems});
  }, [totalItems]);

  return (
    <ScrollView>
      <View style={styles.imageContainer}><Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} /></View>
      <Text style={styles.title}>{selectedProduct.name}</Text>
      <View style={styles.filtersContainer}>
        <View style={styles.priceContainer}><Text style={styles.price}>{price} RON</Text></View>
        <View style={styles.variationsContainer}>
          <Text style={styles.pickerLabel} >  Marime:</Text>
              <Picker
                style={styles.variationPicker}
                mode="dropdown"
                selectedValue={variationOption}
                onValueChange={(variationOption)=> {
                  // updateProductsList(category, query);
                  setVariationOption(variationOption);
                  console.log(variationOption);
                  updatePrice(variationOption);
                  // console.log(price);
                }}
              >
                {variations.map((item, index) => {
                  return (<Picker.Item
                    style={{fontFamily: 'montserrat', fontWeight: 400, fontWeight: 18}}
                    label={item.option} 
                    value={item.option} 
                    key={index}/>) 
                })}
            </Picker>
        </View>
      </View>
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
          disabled={variationOption == 'Selecteaza'}
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
    height: '100%',  
  },
  imageContainer: {
    height: Dimensions.get('window').height / 1.6
  },
  cart: {
    marginRight: 4
  },
  filtersContainer: {
    maxHeight: 64,
    // paddingVertical: 32,
    flex: 1,
    marginTop: 4,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
  variationsContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    width: Dimensions.get('window').width / 3,
    width: 150,
    backgroundColor: '#dbe1e1',
    marginRight: 24,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  priceContainer: {
    width: 184
  },
  variationPicker: {
     width: Dimensions.get('window').width / 3,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
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
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 8,
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
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fcfcff'
  },
  quantity: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'playfair',
    paddingBottom: 8
  },
  pickerLabel: {
    fontSize: 16
  }
});

export default ProductDetailScreen;
