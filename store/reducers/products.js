import {
  SET_PRODUCTS,
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS
} from '../actions/products';

const initialState = {
  isLoading: true,
  availableProducts: [],
  searchProducts: [],
  filterProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: 
      return {
        ...state,
        isLoading: action.isLoading,
        availableProducts: action.products,
        filterProducts: action.filterProducts  
      };

    case FILTER_PRODUCTS: 
        const availableProducts = [...state.availableProducts];
        let filterResults = [];
        let results = [];
        let searchResults = [];
        if (availableProducts) {
          if (action.filterCategory === 'Toate') {
            filterResults = availableProducts;
          } else {
            for (let product of availableProducts) {
              for (let productCateogry of product.categories) {
                if(action.filterCategory === productCateogry.name){
                  filterResults.push(product);       
                }
              }
            }
          }
          
          if (filterResults) {
            if (action.searchQuery !== '') {
              for (let prod of filterResults) {
                action.searchQuery.split(" ").map(query => {
                  if (query.trim() !== '') {
                      if (prod.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || prod.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
                          searchResults.push(prod);
                  }
                })
              }
              results = searchResults;
            } else {
              results = filterResults;
            }
          }
        }
        return {
          ...state,
          filterProducts: results,
        };

  }
  return state;
};

