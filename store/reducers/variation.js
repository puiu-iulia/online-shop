import {
    SET_VARIATIONS
  } from '../actions/variation';
  
  const iState = {
    availableVariations: []
  };
    
  export default (state = iState, action) => {
    switch (action.type) {
      case SET_VARIATIONS: 
        return {
          availableVariations: action.variations
        };
    }
    return state;
  };
    