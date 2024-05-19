const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', OrderSchema);
