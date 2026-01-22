const Vendor = require('../module/Vendor');


const getVendor = async (req , res) => {
    const {vendorId} = req.body;

    try {
        
        const vendor = await Vendor.findById(vendorId);

        if(!vendor) {
            return res.send({success: false, message: "Invalid Vendor"});
        }

        return res.send({success: true, userData: {
            companyName: vendor.companyName,
            contactName: vendor.contactName,
            email: vendor.email,
            phone: vendor.phone,
            address: vendor.address,
            isAccountVerified: vendor.isAccountVerified
        }});


    } catch (error) {
        return res.send({success: false, message: error.message});
    }
}

const updateVendor = async (req, res) => {
    const {vendorId, companyName, contactName, email, phone, address} = req.body;

    if (!vendorId || !companyName || !contactName || !email || !phone || !address) {
        return res.send({success: false, message: "Missing details"});
    }

    try {
        
       await Vendor.updateOne({_id: vendorId}, {$set: {companyName, contactName, email, phone, address}})
       
       return res.send({success: true, message:"Succsfully updated"});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

}




exports.getVendor = getVendor;
exports.updateVendor = updateVendor;