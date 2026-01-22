const express = require('express');
const controller = require('../controller/productController');
const vendorAuth = require('../middleware/vendorAuth');
const upload = require('../middleware/upload.js');

const router = express.Router();

router.post('/addProduct',vendorAuth, upload,controller.createProduct);

router.get('/getProduct',vendorAuth, controller.readProduct);

router.post('/updateProduct', upload,controller.updateProduct);

router.delete('/deleteProduct',controller.deleteProduct);

router.get('/data', controller.getProducts);

module.exports = router;