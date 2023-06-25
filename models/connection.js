require("dotenv").config();
const mongoose = require('mongoose');

// connect to our db
mongoose.connect(
    // connection string
    process.env.URL,
    // for warnings regarding the connection
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// now that its connection, lets make sure our connection is on by adding in some console.logs
mongoose.connection
.on('open', () => console.log('Mongoose connected'))
.on('close', () => console.log('Disconnected from Mongoose'))
.on('error', () => console.log('Mongoose error'))

module.exports = mongoose;