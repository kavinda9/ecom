const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartSchema = new schema({
    cartId: String,
    customerId: String,
    items: [
        {
         productId: {type: String},
         title: {type: String},
         quantity: {type:Number, default: 1},
         size: {type: String},
         color: {type: String},
         price: {type: Number},
         image: {type: String}
        }
    ],
    lastUpdated: String
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;