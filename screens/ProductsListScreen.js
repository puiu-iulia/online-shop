import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Button, Platform, ActivityIndicator, Text, StyleSheet, Picker, ScrollView, TextInput, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import ProductsList from '../components/ProductsList';
import Card from '../components/Card';
import * as cartActions from '../store/actions/cart';
import * as productsActions from '../store/actions/products';
import * as categoriesActions from '../store/actions/categories';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProductsListScreen = props => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [error, setError] = useState();
  const [categoryError, setCategoryError] = useState();
  const [category, setCategory] = useState('Toate');
  const products = useSelector(state => state.products.availableProducts);
  const isLoading = useSelector(state => state.products.isLoading);
  const isCategoryLoading = useSelector(state => state.categories.isCategoryLoading);
  const [allProducts, setAllProducts] = useState(true);
  const [fProducts, setFProducts] = useState(false);
  const categories = useSelector(state => state.categories.availableCategories);
  // FIX ME!! console.log(isLoading);
  const filterProducts = useSelector(state=> state.products.filterProducts);
  // console.log(filterProducts);
  // const searchProducts = useSelector(state=> state.products.searchProducts);
  const totalItems = useSelector(state => state.cart.totalItems);
  const dispatch = useDispatch();

  // const loadProducts = useCallback(async () => {
  //   setError(null);
  //   // setCategoryError(null);
  //   try {
  //     await dispatch(productsActions.fetchProducts());
  //   } catch (err) {
  //     setError(err.message);
  //   };
  //   try {
  //     await dispatch(categoriesActions.fetchCategories());
  //   } catch (err) {
  //     setCategoryError(err.message);
  //   };
  // }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   // setIsCategoryLoading(true);
  //   loadProducts().then(() => {
  //     setIsLoading(false);
  //     // setIsCategoryLoading(false);
  //   });
  // }, [dispatch, loadProducts]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // setIsLoading(true);
        await dispatch(productsActions.fetchProducts());
        // setIsLoading(false);
      } catch (err) {
        // setIsLoading(false);
        setError(err.message);
      };
    };
    const loadCategories = async () => {
      // setIsCategoryLoading(true);
      try {
        await dispatch(categoriesActions.fetchCategories());
        // setIsCategoryLoading(false);
      } catch (err) {
        // setIsCategoryLoading(false);
        setError(err.message);
      };
    };
  
    loadCategories().then(() => {
      //setIsCategoryLoading(false);
      loadProducts();
    });
  }, [dispatch]);


  // const renderFlatList = () => {
  //   if (allProducts) {
  //     return (<ProductsList listData={products} navigation={props.navigation} />);
  //   } else if (fProducts) {
  //     return (<ProductsList listData={filterProducts} navigation={props.navigation} />)
  //   }  
  // };

  const updateProductsList = (category) => {
    setCategory(category);
    dispatch(productsActions.filterProducts(category));
    setAllProducts(false);
    setFProducts(true);
  };


  useEffect(() => {
    props.navigation.setParams({totalItems: totalItems});
  }, [totalItems]);
 
  if (error || categoryError) {
    return (
      <View style={styles.centered}>
        <Text>A avut loc o eroare. Incercati mai tarziu.</Text>
        <Button
          title="Incearca mai tarziu" 
          onPress={() => {}}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (products === null)  {
    return (
      <View style={styles.centered}>
        <Text>Nu s-au gasit produse. Incercati mai tarziu.</Text>
      </View>
    );
  }
  
  if (isLoading || isCategoryLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

    return (
      <View style={styles.screen}>
        <Card style={styles.filtersContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.pickerItem} >Categorii:</Text>
            <Picker
              style={styles.categoryPicker}
              mode="dropdown"
              selectedValue={category}
              onValueChange={(category)=> {
                updateProductsList(category);
              }}
            >
              {categories.map((item, index) => {
                return (<Picker.Item
                  label={item.name} 
                  value={item.name} 
                  key={index}/>) 
              })}
            </Picker>
          </View>
          <View style={styles.searchBox}>
            <View>
              <TextInput
                style={styles.search}
                onValueChange={() => {}} 
                id="search"
                keyboardType="default"
                placeholder=" Cauta Produse..."
              />
              <Ionicons
                  style={styles.searchButton}
                  name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                  size={24}
                  color={Colors.primary}
                />
            </View>
          </View>
        </Card>
        <ProductsList listData={allProducts ? products: filterProducts} navigation={props.navigation} />     
      </View>
    );
  };
  
 

 


ProductsListScreen.navigationOptions = navData => {
  const itemsCount = navData.navigation.getParam('totalItems');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 12,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerTitle: 'Gardenia',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
        <HeaderButtons 
          HeaderButtonComponent={(itemsCount == 0) ? HeaderButton : ItemsCart}
        >
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
  screen: {
    flex: 1
  },
  cart: {
    paddingRight: 20
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  filtersContainer: {
    width: '100%',
    height: '10%',
    maxHeight: 50,
    paddingVertical: 24,
    borderRadius: 0,
    // marginTop: 8,
    marginRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  categoryContainer: {
    flex: 1,  
    flexDirection: 'row',
    paddingLeft: 8,
    justifyContent: 'flex-start'
  },
  categoryPicker: {
    width: "65%",
    position: 'absolute',
    right: 0,
    top: -14
  },
  searchBox: {
    flex: 1,  
    flexDirection: 'row',
    paddingLeft: 8,
    justifyContent: 'flex-end'
  },
  pickerItem: {
    fontSize: 16
  },
  search: {
    position: "absolute",
    bottom: -16,
    left: 0,
    width: '75%',
    borderColor: '#888',
    borderWidth: 0.7,
    borderRadius: 4   
  }, 
  searchButton: {
    position: "absolute",
    right: 16,
    top: -12,
    justifyContent: 'flex-end'
  }
})


export default ProductsListScreen;
