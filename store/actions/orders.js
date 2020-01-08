import Order from '../../models/order';
import CartItem from '../../models/cart';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';
import moment from 'moment';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount, billingName, billingEmail, billingPhone, billingCounty, billingCity, billingAddress, shippingName, shippingPhone, shippingCounty, shippingCity, shippingAddress) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    const data = {
      line_items: cartItems,
      billing: {
        first_name: billingName,
        email: billingEmail.toString(),
        phone: billingPhone,
        county: billingCounty,
        city: billingCity,
        address_1: billingAddress,
      },
      shipping: {
        first_name: shippingName,
        phone: shippingPhone,
        county: shippingCounty,
        city: shippingCity,
        address_1: shippingAddress,
      }
    };
   
    ShopWooCommerceAPI.post('orders', data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: response.id,
          items: cartItems,
          amount: totalAmount,
          date: response.date_created, 
          billingName: billingName,
          billingEmail: billingEmail,
          billingPhone: billingPhone,
          billingCounty: billingCounty,
          billingCity: billingCity,
          billingAddress: billingAddress,
          shippingName: shippingName,
          shippingPhone: shippingPhone,
          shippingCounty: shippingCounty,
          shippingCity: shippingCity,
          shippingAddress: shippingAddress
        }
      });
    })
    .catch(error => {
      console.log(error);
    });   
  };
};

export const fetchOrders = () => {
  let isLoading;
  console.log('getting');
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    ShopWooCommerceAPI.get('orders', {
      per_page: 100
    })
    .then(data => {
      const loadedOrders = [];
      
      // console.log(data);
      for (const key in data) {
        const items = [];
        for (const i in data[key].line_items) {
          items.push(
            new CartItem(
              data[key].line_items[i].quantity,
              data[key].line_items[i].price,
              data[key].line_items[i].name,
              data[key].line_items[i].total
            )
          );
        }
        loadedOrders.push(
          new Order(
            data[key].id,
            items,
            data[key].total,
            new Date(data[key].date_created),
            data[key].billing.first_name + data[key].billing.last_name,
            data[key].billing.email,
            data[key].billing.phone,
            data[key].billing.county,
            data[key].billing.city,
            data[key].billing.address_1,
            data[key].shipping.first_name + " " + data[key].shipping.last_name,
            data[key].shipping.phone,
            data[key].shipping.county,
            data[key].shipping.city,
            data[key].shipping.address_1
          )
        );
      }
        // console.log(loadedOrders);
        isLoading = false;
        dispatch({ type: SET_ORDERS, orders: loadedOrders, isLoading: isLoading });
      })
    .catch(error => {
      console.log(error);
      isLoading = false;
    });
      
  };
};

  
      

      