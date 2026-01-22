const Customer = require('../module/Customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter  = require('../config/nodemailer.js');

const register = async (req, res) => {
    
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.send({success: false, message : "Missing details"});
    }

    try {
        const existingCustomer = await Customer.findOne({email});

        if(existingCustomer) 
            return res.send({success: false, message : "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = new Customer({name, email, password: hashedPassword});

        const response = await customer.save();

        //Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Kade.lk",
            text: `Welcome to Kade.lkYour account has been created with email id: ${email}`
        };

        await transporter.sendMail(mailOptions);
        

        if (response) {

            const token = jwt.sign({id: customer._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7*24*60*60*1000 //mili second
            });
            return res.send({success: true, message: "Succsfully Registed!"});
        }else {
            return res.send({success: false, message : "Not registered!"});
        }
    } catch (error) {
            return res.send({success: false, message : error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    (!email || !password) && res.send({success: false, message: "Email and password are required"});

    try {
        const customer = await Customer.findOne({email});

        !customer && res.send({success: false, message: "Customer not found"});

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            return res.send({success: false, message : "Invalid Password"});
        }

        const token = jwt.sign({id: customer._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000 //mili second
        });

        return res.send({success: true, message: "Login Succsfully"})

    } catch (error) {
        return res.send({success: false, message : error.message});
    }

};

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });

    return res.send({success: true, message: "log out"});
};

const sendVerifyOtp = async (req, res) => {
    const {customerId} = req.body;

    try {
        const customer = await Customer.findById(customerId);

        (customer.isAccountVerified) && res.send({success: false, message: "Account already verified"});

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        customer.verifyOtp = otp;
        customer.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await customer.save();

        //Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: customer.email,
            subject: "Account verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOptions);

        res.send({success: true});

    } catch (error) {
        res.send({success: false, message : error.message});
    }
};

const verifyEmail = async (req, res) => {
    const {customerId, otp} = req.body;

    (!customerId && !otp) && res.send({success: false, message : "Missing details"});

    try {
        
        const customer = await Customer.findById(customerId);

        (!customer) && res.send({success: false, message: "Customer not found"});

        if ( customer.verifyOtp === '' || customer.verifyOtp !== otp ) {
            return res.send({success: false, message: "Invalid OTP"});
        }

        if(customer.verifyOtpExpireAt < Date.now()) {
            return res.send({success: false, message: "OTP Expired"});
        }

        customer.isAccountVerified = true;
        customer.verifyOtp = '';
        customer.verifyOtpExpireAt = 0;

        await customer.save();

        return res.send({success: true, message: "Email verify succesfully"});

    } catch (error) {
        return res.send({success: false, message : error.message});
    }
}

const isAuthenticated = async (req, res) => {
    const {customerId} = req.body;

    try {
        (!customerId) && res.send({success: false, message : "Missing details"});

        const customer = await Customer.findById(customerId);

        if(customer.isAccountVerified) {
            return res.send({success: true});
        }else {
            return res.send({success: false});
        }

    } catch (error) {
        return res.send({success: false, message : error.message});
    }
}

const sendResetOtp = async (req, res) => {
    const {email} = req.body;

    if(!email) {
        return res.send({success: false, message: "Email is required!"});
    }

    try {
        
        const customer = await Customer.findOne({email});
        if(!customer) {
            return res.send({success: false, message: "User not founded"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        customer.resetOtp = otp;
        customer.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await customer.save();

        //Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: customer.email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting your password is ${otp}`
        };

        await transporter.sendMail(mailOptions);

        return res.send({success: true, message: "OTP sent to your email"});

    } catch (error) {
        return res.send({success: false, message : error.message});
    }

};

const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword) {
        return res.send({success: false, messsage: "Email, OTP and new Password are required"});
    }

    try {
        
        const customer = await Customer.findOne({email});

        if (!customer) {
            return res.send({success: false, message: "User not founded"});
        }

        if (customer.resetOtp === '' || customer.resetOtp !== otp) {
            return res.send({success: false, message: "Invalid OTP"});
        }

        if (customer.resetOtpExpireAt < Date.now()) {
            return res.send({success: false, message: "OTP Expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        customer.password = hashedPassword;
        customer.resetOtp = '';
        customer.resetOtpExpireAt = 0;

        await customer.save();

        return res.send({success: true, message: "Password has been reset successfully"});

    } catch (error) {
        return res.send({success: false, message : error.message});
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