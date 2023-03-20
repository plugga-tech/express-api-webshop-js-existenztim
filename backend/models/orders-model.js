const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    
    //vilken användare
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    //vad har den beställt
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number //ska dra av detta i lager hos ProductSchema
        }
    ]

})

module.exports = mongoose.model('order', OrderSchema)