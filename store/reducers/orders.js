import { ADD_ORDER, SET_ORDERS, FILTER_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  isLoading: true,
  orders: [],
  filteredOrders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date,
        action.orderData.billingName,
        action.orderData.billingEmail,
        action.orderData.billingPhone,
        action.orderData.billingCounty,
        action.orderData.billingCity,
        action.orderData.billingAddress,
        action.orderData.shippingName,
        action.orderData.shipppingPhone,
        action.orderData.shippingCounty,
        action.orderData.shippingCity,
        action.orderData.shippingAddress,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    case SET_ORDERS:
      return {
        orders: action.orders
      };
    case FILTER_ORDERS: 
      const availableOrders = [...state.orders];
      let filteredOrders = [];
      if (availableOrders) {
        for (let order of availableOrders) {
          if (action.userId === order.customer_id) {
            filteredOrders.push(order);
          }
        }    
      }
      return {
        ...state,
        filteredOrders: filteredOrders
      };
  }

  return state;
};
