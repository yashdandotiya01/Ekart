import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    user:{
        type:String,
    },

    email:{
        type:String,
    },

    products:[
        {
            title:String,
            price:Number,
            quantity:Number,
            image:String,
        }
    ],

    totalAmount:{
        type:Number,
    },

    paymentId:{
        type:String,
    },

    orderId:{
        type:String,
    },

    status:{
        type:String,
        default:"Processing",
    },

},{
    timestamps:true
});

const Order = mongoose.model(
    "Order",
    orderSchema
);

export default Order;