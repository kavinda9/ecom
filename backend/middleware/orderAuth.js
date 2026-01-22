const Customer = require('../module/Customer.js');
const Cart = require('../module/Cart.js');
const Product = require('../module/Product.js');

const orderAuth = async (req, res, next) => {
    const {customerId, shippingAddress} = req.body;

    try {
        
        if (!shippingAddress) {
            
            const customer = await Customer.findById(customerId);
            
            if (!customer) {
                return res.send({success: false, message: "Customer not found"});
            }
            req.body.shippingAddress = customer.address;
        }

        const cart = await Cart.findOne({customerId});

        if(!cart) {
            return res.send({success: false, message: "Cart not found"});
        }

        let product = await Product.findById(cart.items[0].productId);

        if(!product) {
            return res.send({success: false, message: "Invalid product"});
        }

        const quantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        product.stockQuantity -= quantity;

        await product.save();

        req.body.items = cart.items;
        return next();

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

};


module.exports = orderAuth;