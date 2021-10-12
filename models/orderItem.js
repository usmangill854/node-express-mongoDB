const mongoose = require('mongoose')

const orderItemSchems = mongoose.Schema({
    quantity:{
        type:Number,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref:'Product'
    }

})
exports.OrderItem = mongoose.model('OrderItem',orderItemSchems)