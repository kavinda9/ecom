const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
  orderId: String,
  customerId: String,
  orderDate: String,
  status: String,
  totalAmount: Number,
  items: [
    {
      productId: String,
      title: {type: String},
      quantity: String,
      size: String,
      color: String,
      price: Number,
      image: String
    }
  ],
  shippingAddress: {
    line: String,
    city: String,
    postalCode: Number,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;