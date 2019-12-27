import WooCommerceAPI from 'react-native-woocommerce-api';
 
var ShopWooCommerceAPI = new WooCommerceAPI({
  url: 'https://clients.fizteq.com/gardenia/', // Your store URL
  ssl: true,
  consumerKey: 'ck_6e00d49eac8184ac24171f2cad39fdd681a9ae1d', // Your consumer secret
  consumerSecret: 'cs_e5235c71f835c8478262984657c7a6285af69f01', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

 export default ShopWooCommerceAPI;