const express = require('express');
const controller = require('../controller/vendorController');
const vendorAuth = require('../middleware/vendorAuth');

const router = express.Router();

router.get('/get', vendorAuth, controller.getVendor);
router.post('/update',vendorAuth, controller.updateVendor);

module.exports = router;