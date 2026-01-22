const express = require('express');
const controller = require("../controller/cartController");
const customerAuth = require('../middleware/customerAuth.js');
const productAuth = require('../middleware/productAuth.js');

const router = express.Router();


router.post("/get", customerAuth ,controller.getCart);

router.post('/add', customerAuth, productAuth ,controller.addCart);

router.delete('/delete', controller.deleteCart)

module.exports = router;