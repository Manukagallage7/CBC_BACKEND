import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    date :{
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        default: "preparing"
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const Order = mongoose.model("orders", orderSchema)

export default Order