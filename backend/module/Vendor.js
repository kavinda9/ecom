const mongoose = require('mongoose');
const schema = mongoose.Schema;

const vendorSchema = new schema({
  vendorId: {type:String},
  companyName: {type:String, required: true},
  contactName: {type:String, required: true},
  email: {type:String, required: true},
  phone: {type:String, required: true},
  address: {
    line: {type:String, required: true},
    city: {type:String, required: true},
    postalCode: {type:String, required: true},
    country: {type:String, required: true}
  },
  password: {type:String, required: true},
  verifyOtp: {type:String, default: ''},
  verifyOtpExpireAt: {type: Number, default: 0},
  isAccountVerified: {type: Boolean, default: false},
  resetOtp: {type: String, default: ''},
  resetOtpExpireAt: {type: Number, default: 0}
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;