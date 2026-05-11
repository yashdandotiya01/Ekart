import express from "express";

import {

   createOrder,

   verifyPayment,

   getOrders

} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order",createOrder);

router.get("/orders",getOrders);

router.post("/verify",verifyPayment);

export default router;