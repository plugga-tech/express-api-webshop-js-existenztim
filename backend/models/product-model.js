const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    lager: Number //ev ändra till stock så vi slipper svengelska
})

module.exports = mongoose.model('product', ProductSchema) 