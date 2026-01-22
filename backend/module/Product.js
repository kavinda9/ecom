const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    productId: String,
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    brand: String,
    rating: Number,
    variations: [{
        size: String,
        color: String,
        price: Number,
        image: String
    }],
    stockQuantity: Number,
    vendorId: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;