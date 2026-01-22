const app = require('./app.js');
const mongoose = require('mongoose');
const host = '127.0.0.1';
const port = process.env.PORT || 3000;
require('dotenv').config(); 
const connect = require('./config/db.js');


connect();

const server = app.listen(port, host, () => {
    console.log(`Server succsfully connected! port no: ${server.address().port}`);
})