const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Vendor = require('../module/Vendor.js');
const transporter = require('../config/nodemailer.js');

const register = async (req, res) => {
    const {companyName, contactName, email, phone, address, password} = req.body;

    if (!companyName || !contactName || !email || !phone || !address || !password) {
        return res.send({success: false, message: "Missing details"});
    }

    try {
        
        const existingVendor = await Vendor.findOne({email});

        if(existingVendor) {
            return res.send({success: false, message: "Vendor already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = new Vendor({
            companyName, contactName, email, phone, address, password: hashedPassword
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Kade.lk As vendor",
            text: `Welcome to Kade.lk.Your account has been created with email id: ${email}`
        };

        await transporter.sendMail(mailOptions);

        await vendor.save();

        const token = jwt.sign({id: vendor._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000 //millisecond
        });
        
        return res.send({success: true, message: "Succsfully registered!"})

    } catch (error) {
        return res.send({success: false, message: error.message})
    }
};


const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.send({success: false, message: "Email and password are required!"});
    }

    try {
        
        const vendor = await Vendor.findOne({email});

        if(!vendor) {
            return res.send({success: false, message: "Vendor not found!"})
        }

        const isMatch = await bcrypt.compare(password, vendor.password);

        if (!isMatch) {
            return res.send({success: false, message: "Invalid Passowrd"});
        }

        const token = jwt.sign({id: vendor._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000 //millisecond
        });
        
        return res.send({success: true, message: "Succsfully Login"})

    } catch (error) {
         return res.send({success: false, message: error.message});
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.send({success: true, message: "Logged out"})
    } catch (error) {
        return res.send({success: false, message: error.message});
    }
};

const sendVerifyOtp = async (req, res) => {
    const {vendorId} = req.body;

    try {
        const vendor = await Vendor.findById(vendorId);

        if(!vendor) {
            return res.send({success: false, message: "Vendor is undifiend"});
        }

        if(vendor.isAccountVerified) {
            return  res.send({success: false, message: "Account already verified"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        vendor.verifyOtp = otp;
        vendor.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await vendor.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: vendor.email,
            subject: "Account verification OTP",
            text: `Your otp is ${otp}. Verify your account using this OTP;`
        };

        await transporter.sendMail(mailOptions);

        return res.send({success: true, message: "Send verify OTP"})


    } catch (error) {
        return res.send({success: false, message: error.message});
    }
}

const verifyEmail = async (req, res) => {
    const {otp, vendorId} = req.body;

    if(!otp || !vendorId) {
        return res.send({success: false, message: "Missing details"})
    }

    try {
        
        const vendor = await Vendor.findById(vendorId);

        if(!vendor) {
            return res.send({success: false, message: "Vendor not found"});
        }

        if (vendor.verifyOtp === '' || vendor.verifyOtp !== otp) {
            return res.send({success: false, message: "Invalid OTP"});
        }

        if(vendor.verifyOtpExpireAt < Date.now()) {
            return res.send({success: false, message: "OTP Expired"});
        }

        vendor.isAccountVerified = true;
        vendor.verifyOtp = '';
        vendor.verifyOtpExpireAt = 0;

        await vendor.save();

        return res.send({success: true, message: "Email verify successfully"});

    } catch (error) {
        return res.send({success: false, message: error.message})
    }

};

const isAuthenticated = async (req, res) => {
    const {vendorId} = req.body;

    try {

        if(!vendorId) {
            return res.send({success: false});
        }
        return res.send({success: true});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }
};


const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.send({success: false, message: "Email is required"});
    }

    try {

        const vendor = await Vendor.findOne({email});

        if(!vendor) {
            return res.send({success: false, message: "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        vendor.resetOtp = otp;
        vendor.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await vendor.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: vendor.email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting your password is ${otp};`
        };

        await transporter.sendMail(mailOptions);

        return res.send({success: true, message: "OTP sent to your email"})

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

};

const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if (!email || !otp || !newPassword) {
        return res.send({success: false, message: "Email, OTP and new Password are required"});
    }

    try {
        const vendor = await Vendor.findOne({email});

        if(!vendor) {
            return res.send({success: false, message: "Vendor not found"});
        }

        if(vendor.resetOtp === '' || vendor.resetOtp !== otp ) {
            return res.send({success: false, message: "Invalid OTP"});
        }

        if(vendor.resetOtpExpireAt < Date.now()) {
            return res.send({success: false, message: "OTP Expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        vendor.password = hashedPassword;
        vendor.resetOtp = '';
        vendor.resetOtpExpireAt = 0;

        await vendor.save();

        return res.send({success: false,  message: "Password has been reset succesfully"});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

}

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.sendVerifyOtp = sendVerifyOtp;
exports.verifyEmail = verifyEmail;
exports.isAuthenticated = isAuthenticated;
exports.sendResetOtp = sendResetOtp;
exports.resetPassword = resetPassword;