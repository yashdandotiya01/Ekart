import axios from "axios";

import { useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function Register(){
const navigate = useNavigate();
   const [formData,setFormData]
= useState({

    name:"",

    email:"",

    password:"",

    otp:"",
});

const [registerType,setRegisterType]
= useState("user");

    const [otpSent,setOtpSent] = useState(false);

    const handleChange = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    // SEND OTP
    const sendOTP = async()=>{

        try {

            if(!formData.email){

                return toast.error(
                    "Enter email first"
                );
            }

            const res = await axios.post(
                "http://localhost:5000/api/auth/send-otp",
                {
                    email:formData.email
                }
            );

            toast.success(res.data.message);

            setOtpSent(true);

        } catch (error) {

            toast.error(
                error.response.data.message
            );
        }
    };

    // REGISTER
    const handleSubmit = async(e)=>{

        e.preventDefault();

        try {

            // VERIFY OTP
            await axios.post(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    email:formData.email,
                    otp:formData.otp,
                }
            );

            // REGISTER USER
          const res = await axios.post(

    "http://localhost:5000/api/auth/register",

    {

        name:formData.name,

        email:formData.email,

        password:formData.password,

        otp:formData.otp,

        role:registerType
    }
);


            toast.success(res.data.message);
            localStorage.setItem(
   "user",
   JSON.stringify(res.data.user)
);

localStorage.setItem(
   "token",
   res.data.token
);

        } catch (error) {

            toast.error(
                error.response.data.message
            );
        }
        navigate("/");
    };

    return(
        <div className="auth-container">

            <form
                className="auth-box"
                onSubmit={handleSubmit}
            >

                <h1 className="auth-title">
                    Create Account
                </h1>
              <div className="login-type">

    <button
        type="button"
        className={
            registerType === "user"
            ?
            "active-login-btn"
            :
            "login-btn-type"
        }
        onClick={()=>
        setRegisterType("user")}
    >
        User Register
    </button>

    <button
        type="button"
        className={
            registerType === "admin"
            ?
            "active-login-btn"
            :
            "login-btn-type"
        }
        onClick={()=>
        setRegisterType("admin")}
    >
        Admin Register
    </button>

</div>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    className="auth-input"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    className="auth-input"
                    onChange={handleChange}
                />

                <button
                    type="button"
                    className="otp-btn"
                    onClick={sendOTP}
                >
                    {
                        otpSent ?
                        "OTP Sent" :
                        "Send OTP"
                    }
                </button>

                {
                    otpSent &&

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        name="otp"
                        className="auth-input"
                        onChange={handleChange}
                    />
                }

                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    className="auth-input"
                    onChange={handleChange}
                />

                <button className="auth-btn">
                    Register
                </button>

                <div className="auth-bottom">

                    Already have account?

                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        {" "}Login
                    </Link>

                </div>

            </form>

        </div>
    );
}

export default Register;