import User from "../models/User.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import OTP from "../models/Otp.js";

import transporter from "../config/mail.js";


// SEND OTP
export const sendOTP = async(req,res)=>{

    try {

        const {email} = req.body;

        const otp = Math.floor(

            100000 + Math.random() * 900000

        ).toString();

        // DELETE OLD OTP
        await OTP.deleteMany({email});

        // SAVE OTP
        await OTP.create({

            email,

            otp,

            expiresAt:
            new Date(
                Date.now() + 5 * 60 * 1000
            ),
        });

        // SEND MAIL
        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:email,

            subject:"EKART OTP Verification",

            html:`

                <h2>Your OTP is:</h2>

                <h1>${otp}</h1>

                <p>
                    OTP valid for 5 minutes
                </p>
            `,
        });

        res.status(200).json({

            success:true,

            message:"OTP Sent Successfully",
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};


// VERIFY OTP
export const verifyOTP = async(req,res)=>{

    try {

        const {email,otp} = req.body;

        const existingOTP =
        await OTP.findOne({email});

        if(!existingOTP){

            return res.status(400).json({

                success:false,

                message:"OTP Not Found",
            });
        }

        if(existingOTP.otp !== otp){

            return res.status(400).json({

                success:false,

                message:"Invalid OTP",
            });
        }

        if(existingOTP.expiresAt < new Date()){

            return res.status(400).json({

                success:false,

                message:"OTP Expired",
            });
        }

        res.status(200).json({

            success:true,

            message:"OTP Verified",
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};


// REGISTER USER / ADMIN
export const registerUser = async(req,res)=>{

    try {

        const {

            name,

            email,

            password,

            otp,

            role

        } = req.body;

        // CHECK EXISTING USER
        const existingUser =
        await User.findOne({email});

        if(existingUser){

            return res.status(400).json({

                success:false,

                message:"User already exists",
            });
        }

        // VERIFY OTP
        const existingOTP =
        await OTP.findOne({email});

        if(!existingOTP){

            return res.status(400).json({

                success:false,

                message:"OTP Not Found",
            });
        }

        if(existingOTP.otp !== otp){

            return res.status(400).json({

                success:false,

                message:"Invalid OTP",
            });
        }

        // HASH PASSWORD
        const hashedPassword =
        await bcrypt.hash(password,10);

        // CREATE USER
        const user = await User.create({

            name,

            email,

            password:hashedPassword,

            role,
        });

        // DELETE OTP AFTER SUCCESS
        await OTP.deleteMany({email});

        res.status(201).json({

            success:true,

            message:"Registration Successful",

            user,
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};


// LOGIN USER / ADMIN
export const loginUser = async(req,res)=>{

    try {

        const {email,password}
        = req.body;

        // FIND USER
        const user =
        await User.findOne({email});

        if(!user){

            return res.status(400).json({

                success:false,

                message:"Invalid Credentials",
            });
        }

        // CHECK PASSWORD
        const isMatch =
        await bcrypt.compare(

            password,

            user.password
        );

        if(!isMatch){

            return res.status(400).json({

                success:false,

                message:"Invalid Credentials",
            });
        }

        // SEND LOGIN MAIL
        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:user.email,

            subject:"New Login On EKART",

            html:`

                <h2>Login Successful</h2>

                <p>
                    Your EKART account
                    was logged in successfully.
                </p>

                <p>
                    If this wasn't you,
                    please change password immediately.
                </p>
            `,
        });

        // JWT TOKEN
        const token = jwt.sign(

            {

                id:user._id,

                role:user.role,
            },

            process.env.JWT_SECRET,

            {

                expiresIn:"7d",
            }
        );

        // HIDE PASSWORD
        user.password = undefined;

        res.status(200).json({

            success:true,

            message:"Login Successful",

            token,

            user,
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};