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
        searchProducts: action.searchProducts,
        filterProducts: action.filterProducts,
      
      };

    // case SEARCH_PRODUCTS: 
    //     let searchResults = [...state.products];
    //     searchResults = searchResults.filter(product => {
    //       if (action.searchQuery.trim() === '')
    //         return product;
    //       let result = false;
    //       action.searchQuery.split(" ").map(query => {
    //           if (query.trim() !== '') {
    //               if (product.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || product.description.toLowerCase().indexOf(query.toLowerCase()) > -1)
    //                   result = result || true;
    //           }
    //       })
    //       if (result)
    //           return product;
    //     });
    //     return {
    //       ...state,
    //       searchProducts: searchResults
    //     }

    case FILTER_PRODUCTS: 
        const availableProducts = [...state.availableProducts];
        let filterResults = [];
        if (availableProducts)
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
        // console.log(filterResults);
        return {
          ...state,
          filterProducts: filterResults,
        };

  }
  return state;
};

