import express from "express";

import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";



const app = express();


// MIDDLEWARES
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));


// ROUTES
app.use("/api/auth",authRoutes);

app.use("/api/products",productRoutes);

app.use("/api/payment",paymentRoutes);


// DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});


// TEST ROUTE
app.get("/",(req,res)=>{
    res.send("API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});