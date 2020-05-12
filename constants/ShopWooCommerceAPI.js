import WooCommerceAPI from 'react-native-woocommerce-api';
 
var ShopWooCommerceAPI = new WooCommerceAPI({
  url: 'https://gardenia.ro/', // Your store URL
  ssl: true,
  consumerKey: 'ck_5912fabcd383d17a794b9372e661b8dfc0397c22', // Your consumer secret
  consumerSecret: 'cs_a2132a422d891b4b779c09a07f5f8b64ce94b275', // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

 export default ShopWooCommerceAPI;
