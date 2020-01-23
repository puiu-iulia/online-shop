import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Button, Platform, ActivityIndicator, Text, StyleSheet, Picker, ScrollView, TextInput, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { withBadge } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import HeaderButton from '../components/HeaderButton';
import ProductsList from '../components/ProductsList';
import Card from '../components/Card';
import * as cartActions from '../store/actions/cart';
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
  const categories = useSelector(state => state.categories.availableCategories);
  const filterProducts = useSelector(state=> state.products.filterProducts);
  const totalItems = useSelector(state => state.cart.totalItems);
  const dispatch = useDispatch();

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
    loadCategories().then(() => {
      loadProducts();
    });
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
                updateProductsList(category, query);
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
              <View style={styles.search}>
                <TextInput
                  style={styles.searchInput}
                  multiline={false}
                  value={query}
                  clearButtonMode='always'
                  onChangeText={(query) => {
                    setQuery(query);
                    // updateProductsList(category, query);
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
                  : null
                }
              </View>
              <Ionicons
                  style={styles.searchButton}
                  name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                  size={24}
                  onPress={() => {
                    console.log(query);
                    setIsSearching(true);
                    updateProductsList(category, query);
                  }}
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
  const Logo = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 48,
        alignItems: 'center'
      }}>
        {/* <Image 
          source={{uri: 'asset:/logo.PNG'}}
          style={{height: 24}}
        /> */}
        <Ionicons
            name={'ios-flower'}
            size={28}
            color={Colors.accent}
          />
        <Text 
          style={{
            marginLeft: 4,
            fontSize: 24,
            color: 'white',
            textTransform: 'uppercase'
          }}
        >Gardenia</Text>
      </View>
    );
  }
  const ItemsCart = withBadge(itemsCount, {
    bottom: 0,
    right: 0,
    badgeStyle: {
      backgroundColor: Colors.accent
    }
  })(HeaderButton);
  return {
    headerTitle: <Logo />,
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
  screen: {
    flex: 1
  },
  cart: {
    marginRight: 4
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  filtersContainer: {
    width: '100%',
    height: '10%',
    maxHeight: 48,
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
  clearSearchButton: {

  },
  pickerItem: {
    fontSize: 16
  },
  searchInput: {

  },
  search: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: -16,
    left: 0,
    width: '75%',
    maxWidth: 180,
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
