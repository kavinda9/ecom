const jwt = require('jsonwebtoken');

const vendorAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.send({success: false,message: "Not Authorized. Login Again"});
    }

    try {
        
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id) {
            req.body = req.body || {};
            req.body.vendorId = tokenDecode.id;
            return next();
        }else {
            return res.send({success: false, message: "Not authorized. LOgin Again!"})
        }

    } catch (error) {
        return res.send({success: false, message: error.message})
    }

}

module.exports = vendorAuth;