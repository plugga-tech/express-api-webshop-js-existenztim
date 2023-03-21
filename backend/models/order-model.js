const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    
    //vilken användare
    user: {
        type: String,
        required: true,
    },

    //vad har den beställt
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true 
            }//ska dra av detta i lager hos ProductSchema
        }
    ]

})

module.exports = mongoose.model('order', OrderSchema)