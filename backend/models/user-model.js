const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: { 
        type: String, 
        optional: true 
    }
})

module.exports = mongoose.model('user', UserSchema) 