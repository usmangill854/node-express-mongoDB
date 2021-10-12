const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const orderSchema = mongoose.Schema({
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "OrderItem",
            required:true
        }
    ],
    shippingAddess1:{
        type:String,
        required:true
    },
    shippingAdress2:{
        type: String
    },
    city:{
        type:String,
        required: true
    },
    zip: {
        type:String,
        required:true
    },
    country:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    totalPrice: {
        type: Number
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }


})
orderSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
orderSchema.set('toJSON',{
    virtuals: true
})
exports.Order = mongoose.model('Order',orderSchema)