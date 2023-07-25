const mongoose = require('mongoose');

//Create User model

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    timeStamp: true,
});

const User = mongoose.model("User",userModel);

module.exports = User;