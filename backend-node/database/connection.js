require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URI;

mongoose.set('strictQuery', true);

mongoose.connect(`${mongoURL}/unSocialDB`, { useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB");
})


module.exports = mongoose;

