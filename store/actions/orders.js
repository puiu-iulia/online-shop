import Order from '../../models/order';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
   
    ShopWooCommerceAPI.post('orders', Order, {
      
    })
    .then(data => {
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: id,
          items: cartItems,
          amount: totalAmount,
          date: date
        }
      });
    })
    .catch(error => {
      console.log(error);
    });   
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    
    ShopWooCommerceAPI.get('orders', {
    })
    .then(data => {
      const loadedOrders = [];
  
      for (const key in data) {
        loadedOrders.push(
          new Order(
            data[key].id,
            data[key].cartItems,
            data[key].totalAmount,
            new Date(data[key].date)
          )
        );
      }
      
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
      })
    .catch(error => {
      console.log(error);
    });
      
  };
};

  
      

      