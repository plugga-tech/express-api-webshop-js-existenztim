const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  });
module.exports = mongoose.model('order', OrderSchema)