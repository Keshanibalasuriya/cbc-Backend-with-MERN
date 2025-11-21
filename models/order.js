import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true 
    }, 
    orderedItems: [
        { 
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    paymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Preparing"
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

});




const Order = mongoose.model("Orders", orderSchema);

export default Order;