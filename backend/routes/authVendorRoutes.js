const express = require('express');
const router = express.Router();

const controller = require('../controller/vendorAuthConroller');
const vendorAuth = require('../middleware/vendorAuth');

router.post('/auth/register', controller.register);
router.post('/auth/login', controller.login);
router.post('/auth/logout', controller.logout);
router.post('/auth/send-verify-otp', vendorAuth,controller.sendVerifyOtp);
router.post('/auth/verify-email', vendorAuth, controller.verifyEmail);
router.post('/auth/is-auth', vendorAuth, controller.isAuthenticated);
router.post('/auth/send-reset-otp', controller.sendResetOtp);
router.post('/auth/reset-password', controller.resetPassword);

module.exports = router;