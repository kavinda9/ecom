const Order = require('../module/Order');

const addOrder = async (req, res, next) => {
    const { customerId, items, shippingAddress} = req.body;

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
        const order = new Order({
             customerId , orderDate: Date.now(), status: "Confirmed", totalAmount, items, shippingAddress
        });

        await order.save();
        req.orderId = String(order._id);
        return next();

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

};


const getOrder = async (req, res) => {
    const {productId} = req.body;

    try {
        const order = await Order.findOne({productId});

        order ? res.send({success: true, message: "Succsfully getOrder", order}) : res.send({success: false, message: "Not Added"}) ;

    } catch (error) {
        res.send({success: false, message: error.message});
    }

};

const updateOrder = async (req) => {

    const {customerId, status} = req.body;

    if(!status) {
        return res.send({success: false, message: "Missing details"});
    }

    try {
        
        const order = await Order.findOne({customerId});

        if(!order) {
            return res.send({success: false, message: "Invalid Order"});
        }

        order.status = status;

        await order.save();
        return res.send({success: true, message: "Succsfully updated"});

    } catch (error) {
        res.send({success: false, message: error.message});
    }
};

const deleteOrder = async (req, res) => {
    const {customerId} = req.body;

    try {
        const order = await Order.deleteOne({customerId});

        if(!order) {
            return res.send({success: false, message: "Not Added"}) ;

        }
        
        return res.send({success: true, message: "Succsfully deleted", order})

    } catch (error) {
        res.send({success: false, message: error.message});
    }
};


exports.addOrder = addOrder;
exports.getOrder = getOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;