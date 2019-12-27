import Product from '../../models/product';
import Category from '../../models/category';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';

export const fetchProducts = () => {
  let isLoading;
  console.log('getting');
  return async dispatch => {
    ShopWooCommerceAPI.get('products', {
      per_page: 100
    })
    .then(data => {
      const loadedProducts = [];
      // console.log(loadedProducts);
  
      for (const key in data) {
        const loadedCategories = [];
        for (const i in data[key].categories) {
          loadedCategories.push(
            new Category(
              data[key].categories[i].id,
              data[key].categories[i].name
            )
          );
        }
        loadedProducts.push(
          new Product(
            data[key].id,
            data[key].name,
            data[key].images[0].src,
            data[key].description,
            data[key].price,
            loadedCategories
          )
        );
      }
      isLoading = false;
      console.log('got');
      dispatch({ type: SET_PRODUCTS, products: loadedProducts, isLoading: isLoading });
    })
    .catch(error => {
      console.log(error);
      isLoading = false;
    });
      
  };
};

export const searchProducts = (query) => {
  // return {
  //   type: SEARCH_PRODUCTS,
  //   searchQuery: query
  // }
};

export const filterProducts = (category) => {
  return {
    type: FILTER_PRODUCTS,
    filterCategory: category
  }
};
