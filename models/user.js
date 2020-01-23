class User {
    constructor(id, billingName, email, billingPhone, billingCounty, billingCity, billingAddress, shippingName, shippingPhone, shippingCounty, shippingCity, shippingAddress) {
      this.id = id;
      this.billingName = billingName;
      this.email = email;
      this.billingPhone = billingPhone;
      this.billingCounty = billingCounty;
      this.billingCity = billingCity;
      this.billingAddress = billingAddress;
      this.shippingName = shippingName;
      this.shippingPhone = shippingPhone;
      this.shippingCounty = shippingCounty;
      this.shippingCity = shippingCity;
      this.shippingAddress = shippingAddress;
    }
  }
  
  export default User;