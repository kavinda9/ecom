const express = require('express');
const controller = require('../controller/customerController');
const customerAuth = require('../middleware/customerAuth');

const router = express.Router();


router.get("/data",customerAuth, controller.getCustomerData);

router.post('/update',customerAuth, controller.updateCustomerData);

module.exports = router;