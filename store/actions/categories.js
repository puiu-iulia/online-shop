import Category from '../../models/category';

import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const fetchCategories = () => {
    let isCategoryLoading;
    return async dispatch => {
  
      ShopWooCommerceAPI.get('products/categories', {
      })
      .then(data => {
        const loadedCategories = [];
        const toate = new Category(-1, 'Toate');
        loadedCategories.push(toate);
    
        for (const key in data) {
            if (data[key].name != 'Uncategorized')
              loadedCategories.push(
                new Category(
                  data[key].id,
                  data[key].name
                )
            );   
        }

        dispatch({ type: SET_CATEGORIES, categories: loadedCategories, isCategoryLoading: isCategoryLoading });
      })
      .catch(error => {
        console.log(error);
      });
        
    };
  };