import Order from '../../models/order';
import CartItem from '../../models/cart';
import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';
import moment from 'moment';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const FILTER_ORDERS = 'FILTER_ORDERS';

export const addOrder = (cartItems, totalAmount, billingName, billingEmail, billingPhone, billingCounty, billingCity, billingAddress, shippingName, shippingPhone, shippingCounty, shippingCity, shippingAddress) => {
  let isLoading;
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().user.userId;
    console.log(userId);
    const date = new Date();

    lineItems = [];
    for (const key in cartItems) {
      lineItems.push({
        product_id: key,
        quantity: cartItems[key].quantity
      })
    };

    const data = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: false,
      customer_id: userId,
      billing: {
        first_name: billingName,
        last_name: "",
        address_1: billingAddress,
        address_2: billingPhone,
        city: billingCity,
        state: billingCounty,
        postcode: "",
        country: "RO",
        phone: ""
      },
      shipping: {
        first_name: shippingName,
        last_name: "",
        address_1: shippingAddress,
        address_2: shippingPhone,
        city: shippingCity,
        state: shippingCounty,
        postcode: "",
        country: "RO",
        phone: ""
      },
      line_items: lineItems
    };
   
    await ShopWooCommerceAPI.post('orders', data, {

    })
    .then((response) => {
      console.log(response);
      isLoading = false;
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: response.id,
          userId: response.customer_id,
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
        }, 
        isLoading: isLoading
      });
    })
    .catch(error => {
      console.log(error);
    });   
  };
};

export const fetchOrders = () => {
  let isLoading;
  return async (dispatch, getState) => {
    console.log(getState().user);
    const userId = getState().user.userId;
    console.log(userId);
    await ShopWooCommerceAPI.get('orders', {
      per_page: 100,
      customer: userId
    })
    .then(data => {
      const loadedOrders = [];
      
      console.log(data);
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
        if (data[key].customer_id === userId) {
          loadedOrders.push(
            new Order(
              data[key].id,
              data[key].customer_id,
              items,
              data[key].total,
              new Date(data[key].date_created),
              data[key].billing.first_name + " " + data[key].billing.last_name,
              data[key].billing.email,
              data[key].billing.address_2,
              data[key].billing.state,
              data[key].billing.city,
              data[key].billing.address_1,
              data[key].shipping.first_name + " " + data[key].shipping.last_name,
              data[key].shipping.address_2,
              data[key].shipping.state,
              data[key].shipping.city,
              data[key].shipping.address_1
            )
          );
        }        
      }
        console.log(loadedOrders);
        isLoading = false;
        dispatch({ type: SET_ORDERS, orders: loadedOrders, isLoading: isLoading });
      })
    .catch(error => {
      console.log(error);
      isLoading = false;
    });
      
  };
};

export const filterOrders = (getState) => {
  return {
    type: FILTER_ORDERS
  }
}

  
      

      