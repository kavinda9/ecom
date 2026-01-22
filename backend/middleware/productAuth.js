const Product = require('../module/Product.js');

const productAuth = async (req, res, next) => {
    const {productId, item, quantity} = req.body;
    
    if(!productId) {
        return res.send({success: false, message: "Missing details"});
    }

    try {

        const product = await Product.findById(productId);

        if (!product) {
            return res.send({success: false, message: "Product not found"});
        }

        if(product.variations.length == 0) {
            req.body.items = {productId, title: product.title, price: product.price, image: product.image, quantity};
            return next();
        }
        
        req.body.items = [{productId, title: product.title,size: item.size, color: item.color, price: item.price, image: item.image, quantity}];
        
        return next();

    } catch (error) {
        return res.send({success: false, message: error.message});
    }
};

module.exports = productAuth;