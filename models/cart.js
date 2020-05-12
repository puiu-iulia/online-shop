class CartItem {
    constructor(quantity, productId, variationId, productPrice, productTitle, imageUrl, sum) {
      this.quantity = quantity;
      this.productId = productId;
      this.variationId = variationId;
      this.productPrice = productPrice;
      this.productTitle = productTitle;
      this.imageUrl = imageUrl;
      this.sum = sum;
    }
  }
  
  export default CartItem;
  