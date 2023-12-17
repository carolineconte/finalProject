const mongoose = require('mongoose');

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(process.env.CONNECTIONSTRING);
        console.log('Connected')

        return dbConn
    } catch (error) {
        console.log(error)
    }
}

conn();

module.exports = conn;