const Customer = require('../module/Customer');


const getCustomerData = async (req, res) => {
    const {customerId} = req.body;

    if(!customerId) {
        return res.send({success: false, message: "Missing details"});
    }

    try {
        
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.send({success: false, message: "User not founded"});
        }

        return res.send({success: true, userData: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            isAccountVerified: customer.isAccountVerified
        }});

    } catch (error) {
        return res.send({success: false, message: error.message});
    }


}

const updateCustomerData = async (req, res) => {
    const {customerId, name, email, phone, address} = req.body;

    if ( !customerId || !name || !email || !phone || !address ) {
        return res.send({success: false, message: "Missing details"})
    }

    try {
        const response = await Customer.updateOne({_id: customerId}, {$set: {name, email, phone, address}})

        if (!response) {
            return res.send({success: false, message: "Error Updated"})
        }

        return res.send({success: true, message: "Succsufully updated"})

    } catch (error) {
        return res.send({success: false, message: error.message});
    }

}




exports.getCustomerData = getCustomerData;
exports.updateCustomerData = updateCustomerData;