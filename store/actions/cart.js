export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const ADD_ORDER = 'ADD_ORDER';

export const addToCart = (product, price, quantity, variation, productId, variationId) => {
  return { type: ADD_TO_CART, product: product, price: price, quantity: quantity, variation: variation, prId: productId, variationId: variationId};
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const addQuantity = prodId => {
  return { type: ADD_QUANTITY, prodId: prodId };
};

