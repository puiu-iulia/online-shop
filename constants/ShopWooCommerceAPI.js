import WooCommerceAPI from 'react-native-woocommerce-api';
 
var ShopWooCommerceAPI = new WooCommerceAPI({
  url: 'https://gardenia.ro/', // Your store URL
  ssl: true,
  consumerKey: 'xxx', // Your consumer secret
  consumerSecret: 'xxx', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

 export default ShopWooCommerceAPI;
