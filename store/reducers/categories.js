import {
  SET_CATEGORIES
} from '../actions/categories';

const iState = {
  availableCategories: []
};
  
export default (state = iState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: 
      return {
        availableCategories: action.categories
      };
  }
  return state;
};
  