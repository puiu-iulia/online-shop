export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';

export const addToCart = (product, quantity) => {
  return { type: ADD_TO_CART, product: product, quantity: quantity};
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const addQuantity = prodId => {
  return { type: ADD_QUANTITY, prodId: prodId };
};
