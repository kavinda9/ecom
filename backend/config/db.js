const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log("Successfully connect to the mongodb");
    }catch(error) {
        console.log(error);
    }
}

module.exports = connect;