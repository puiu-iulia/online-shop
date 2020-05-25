import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Button, Platform, ActivityIndicator, Text, StyleSheet, Picker, ScrollView, TextInput, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';

import HeaderButton from '../components/HeaderButton';
import ProductsList from '../components/ProductsList';
import Logo from '../components/Logo';
import * as userActions from '../store/actions/user';
import * as productsActions from '../store/actions/products';
import * as categoriesActions from '../store/actions/categories';
import Colors from '../constants/Colors';


const ProductsListScreen = props => {
  const [error, setError] = useState();
  const [categoryError, setCategoryError] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [category, setCategory] = useState('Toate');
  const products = useSelector(state => state.products.availableProducts);
  const isLoading = useSelector(state => state.products.isLoading);
  const isCategoryLoading = useSelector(state => state.categories.isCategoryLoading);
  const [allProducts, setAllProducts] = useState(true);
  const [query, setQuery] = useState('');
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const categories = useSelector(state => state.categories.availableCategories);
  const filterProducts = useSelector(state=> state.products.filterProducts);
  const totalItems = useSelector(state => state.cart.totalItems);
  const dispatch = useDispatch();

  let categoriesOptions = [];
  for ( const i in categories ) {
    categoriesOptions.push(categories[i].name);
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(productsActions.fetchProducts());
      } catch (err) {
        setError(err.message);
      };
    };
    const loadCategories = async () => {
      try {
        await dispatch(categoriesActions.fetchCategories());
      } catch (err) {
        setCategoryError(err.message);
      };
    };
    const loadUser = async () => {
      try {
        await dispatch(userActions.getUser());
      } catch (err) {
        setCategoryError(err.message);
      };
    };
  
    loadCategories().then(() => {
      loadProducts();
    });
    loadUser();
  }, [dispatch]);

  const updateProductsList = (category, query) => {
    setCategory(category);
    dispatch(productsActions.filterProducts(category, query));
    setAllProducts(false);
  };

  useEffect(() => {
    props.navigation.setParams({totalItems: totalItems});
  }, [totalItems]);
 
  if (error || categoryError) {
    return (
      <View style={styles.centered}>
        <Text>A avut loc o eroare.</Text>
        <Button
          title="Incearca din nou" 
          onPress={() => {
            loadCategories();
            loadProducts();
          }}
          color={Colors.primary}
        />
      </View>
    );
  }


  if (!isLoading && products.length == 0)  {
    return (
      <View style={styles.centered}>
        <Text>Nu s-au gasit produse. Incercati mai tarziu.</Text>
      </View>
    );
  }
  
  if (isLoading || isCategoryLoading) {
    return (
      <View style={styles.centered}>
        <Image
          style={{height: 40, width: 40}}
          source={require('../assets/loading.gif')}
        />
      </View>
    );
  }

    return (
      <View style={styles.screen}>
        <View style={styles.filtersContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.pickerItem} >Categorii:</Text>
            <Picker
              style={styles.categoryPicker}
              mode="dropdown"
              selectedValue={category}
              onValueChange={(category)=> {
                updateProductsList(category, query);
              }}
            >
              {categories.map((item, index) => {
                return (<Picker.Item
                  style={{fontFamily: 'montserrat', fontWeight: 400, fontWeight: 18}}
                  label={item.name} 
                  value={item.name} 
                  key={index}/>) 
              })}
            </Picker>
          </View>
          <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  multiline={false}
                  value={query}
                  clearButtonMode='always'
                  onChangeText={(query) => {
                    setQuery(query);
                    setIsSearching(true);
                    updateProductsList(category, query);
                  }} 
                  id="search"
                  keyboardType="default"
                  placeholder=" Cauta Produse..."
                />
                {isSearching ? (
                      <View>
                        <MaterialIcons
                          style={styles.clearSearchButton}
                          name={'cancel'}
                          size={24}
                          onPress={() => {
                            setQuery('');
                            setIsSearching(false);
                            updateProductsList(category, '');
                          }}
                          color={'#888'}
                        />
                      </View>
                    )
                  :   
                  ( 
                  <Ionicons
                    style={styles.clearSearchButton}
                    name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                    size={32}
                    onPress={() => {
                      console.log(query);
                      setIsSearching(true);
                      updateProductsList(category, query);
                    }}
                    color={Colors.primary}
                  /> 
                  )
                }
              </View>
        </View>
        <ProductsList listData={allProducts ? products: filterProducts} navigation={props.navigation} />     
      </View>
    );
  };
  
 

 


ProductsListScreen.navigationOptions = navData => {
  const itemsCount = navData.navigation.getParam('totalItems');
  const ItemsCart = withBadge(itemsCount, {
    bottom: 0,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerTitle: <Logo title={'G a r d e n i a'} />,
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            color={Colors.primary}
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
             color={Colors.primary} 
             style={styles.cart} 
             title="Cart"
             iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
             onPress={() => {
              navData.navigation.navigate('Cart');
            }}
           />
        </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: 'white'
    }  
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  cart: {
    marginRight: 4
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fcfcff'
  },
  filtersContainer: {
    width: '100%',
    height: '15%',
    maxHeight: 64,
    paddingVertical: 32,
    marginRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
  categoryContainer: {
    flex: 1,  
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#dbe1e1',
    marginLeft: 8,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryPicker: {
     width: "64%",
     marginRight: 8
  },
  searchContainer: {
    flex: 1,  
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    height: 40,
    borderColor: '#dbe1e1',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  clearSearchButton: {
    marginRight: 4,
    color:'#dbe1e1'
  },
  pickerItem: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'montserrat'
  } 
})


export default ProductsListScreen;
