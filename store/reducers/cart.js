import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
  totalItems: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const quantity = action.quantity;
      const prodPrice = parseInt(action.price);
      const prodTitle = addedProduct.name;
      const prodImage = addedProduct.imageUrl;
      
      let newCartItems;
      // console.log(action.prId);
      // console.log(addedProduct.id);
      let variationId = action.variationId;
      if (state.items[variationId]) {
        if  (addedProduct.price == prodPrice) {
          // console.log(addedProduct.price, prodPrice, "same");
          newCartItems = { ...state.items, [variationId]: new CartItem(
            state.items[variationId].quantity + quantity,
            action.prId,
            variationId,
            prodPrice,
            prodTitle + " - "  + action.variation,
            prodImage,
            prodPrice * (state.items[variationId].quantity + quantity)
          )} 
        } else {
          // console.log(addedProduct.price, prodPrice, "diferit");
          newCartItems = { ...state.items, [variationId]: new CartItem(quantity, action.prId, variationId, prodPrice, prodTitle + " - "  + action.variation, prodImage, prodPrice * quantity)}  
        }
      } else {
        newCartItems = { ...state.items, [variationId]: new CartItem(quantity, action.prId, variationId, prodPrice, prodTitle + " - "  + action.variation, prodImage, prodPrice * quantity)}  
      }
      return {
        ...state,
        items: newCartItems,
        totalAmount: state.totalAmount + prodPrice * quantity,
        totalItems: state.totalItems + quantity
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      // const currentPrice = selectedCartItem.price;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productId,
          selectedCartItem.variationId,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.imageUrl,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
        totalItems: state.totalItems - 1
      };
    case ADD_QUANTITY: 
      const selectedItem = state.items[action.prodId];
      // const currentQtty = selectedCartItem.quantity;
      let updatedQtyItems;
      if (selectedItem) {
        const updatedItem = new CartItem(
          selectedItem.quantity + 1,
          selectedItem.productId,
          selectedItem.variationId,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.imageUrl,
          selectedItem.sum + selectedItem.productPrice
        );
      updatedQtyItems = { ...state.items, [action.prodId]: updatedItem };
      }     
      return {
        ...state,
        items: updatedQtyItems,
        totalAmount: state.totalAmount + selectedItem.productPrice,
        totalItems: state.totalItems + 1
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
        totalItems: state.totalItems - selectedCartItem.quantity
      };
  }

  return state;
};
