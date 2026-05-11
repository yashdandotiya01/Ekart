import crypto from "crypto";

import razorpay from "../config/razorpay.js";

import Order from "../models/Order.js";


// CREATE ORDER
export const createOrder = async(req,res)=>{

    try {

        const {amount} = req.body;

        const options = {

            amount: amount * 100,

            currency:"INR",
        };

        const order =
        await razorpay.orders.create(options);

        res.status(200).json({
            success:true,
            order,
        });

  } catch (error) {

    console.log("CREATE ORDER ERROR:", error);

    res.status(500).json({
        success:false,
        message:error.message,
    });
}
};


// VERIFY PAYMENT
export const verifyPayment = async(req,res)=>{

    try {

      const {

    razorpay_order_id,

    razorpay_payment_id,

    razorpay_signature,

    cartItems,

    totalAmount,

    user,

    email

} = req.body;

        const body =
        razorpay_order_id +
        "|" +
        razorpay_payment_id;

        const expectedSignature =
        crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_SECRET
        )
        .update(body.toString())
        .digest("hex");

        const isAuthentic =
        expectedSignature === razorpay_signature;

        if(!isAuthentic){

            return res.status(400).json({
                success:false,
                message:"Payment Failed",
            });
        }

        // SAVE ORDER
       await Order.create({

    user,

    email,

    products:cartItems,

    totalAmount,
    user:"Yash",

email:"yash@gmail.com",

    paymentId:razorpay_payment_id,

    orderId:razorpay_order_id,
});

        res.status(200).json({
            success:true,
            message:"Payment Successful",
        });

  } catch (error) {

    console.log("VERIFY PAYMENT ERROR:", error);

    res.status(500).json({
        success:false,
        message:error.message,
    });
}
}
export const getOrders = async(req,res)=>{

    try {

        const orders =
        await Order.find()
        .sort({createdAt:-1});

        res.status(200).json({
            success:true,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};