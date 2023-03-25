const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    lager: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    token: {
        type: String,
        require: true,
    }

})

module.exports = mongoose.model('product', ProductSchema) 