import moment from 'moment';

class Order {
  constructor(id, userId, items, totalAmount, date, billingName, email, billingPhone, billingCounty, billingCity, billingAddress, shippingName, shippingPhone, shippingCounty, shippingCity, shippingAddress) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
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

  get readableDate() {
    return moment(this.date).format('DD.MM.YYYY');
  }
}

export default Order;
