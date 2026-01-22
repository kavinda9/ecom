const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
  customerId: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, default: ''},
  address: {
    line: {type: String, default: ''},
    city: {type: String, default: ''},
    postalCode: {type: String, default: ''},
  },
  registeredDate: {type: String, default: ''},
  password: {type: String, required: true},
  verifyOtp: {type: String, default: ''},
  verifyOtpExpireAt: {type: Number, default: 0},
  isAccountVerified: {type: Boolean, default: false},
  resetOtp: {type: String, default: ''},
  resetOtpExpireAt: {type: Number, default: 0}
});

const Customer = mongoose.model("Customers", productSchema);

module.exports = Customer;