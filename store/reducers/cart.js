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
      const prodPrice = parseInt(addedProduct.price);
      const prodTitle = addedProduct.name;

      let updatedOrNewCartItem;
      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + quantity,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice *  quantity
        );
      } else {
        updatedOrNewCartItem = new CartItem(quantity, prodPrice, prodTitle, prodPrice * quantity);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice * quantity,
        totalItems: state.totalItems + quantity
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
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
      console.log(state.items[action.prodId])
      const selectedItem = state.items[action.prodId];
      // const currentQtty = selectedCartItem.quantity;
      let updatedQtyItems;
      if (selectedItem) {
        const updatedItem = new CartItem(
          selectedItem.quantity + 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
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
