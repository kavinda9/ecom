const express= require('express');
const controller = require('../controller/customerAuthController.js');
const customerAuth = require('../middleware/customerAuth.js');


const router = express.Router();

router.post('/auth/register', controller.register);
router.post('/auth/login', controller.login);
router.post('/auth/logout', controller.logout);
router.post('/auth/send-verify-otp', customerAuth, controller.sendVerifyOtp);
router.post('/auth/verify-account', customerAuth, controller.verifyEmail);
router.post('/auth/is-auth', customerAuth, controller.isAuthenticated);
router.post('/auth/sent-reset-otp', controller.sendResetOtp);
router.post('/auth/reset-password', controller.resetPassword);

module.exports = router;