const express = require('express');
const controller = require('../controller/orderController');
const orderAuth = require('../middleware/orderAuth.js');
const customerAuth = require('../middleware/customerAuth.js');
const vendorAuth = require('../middleware/vendorAuth.js');
const cartController = require('../controller/cartController.js')

const router = express.Router();

router.post('/add', customerAuth ,orderAuth ,controller.addOrder, cartController.deleteCart);

router.get('/get',customerAuth,controller.getOrder);


router.put('/update', vendorAuth ,controller.updateOrder);


router.delete('/delete',customerAuth, controller.deleteOrder);

module.exports = router;