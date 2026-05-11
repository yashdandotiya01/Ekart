import axios from "axios";

import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    password: "",
  });

  const [loginType, setLoginType] =
  useState("user");

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/login",

        formData
      );

      // ADMIN VALIDATION
      if(

        loginType === "admin"

        &&

        res.data.user.role !== "admin"
      ){

        return toast.error(
          "Not An Admin Account"
        );
      }

      toast.success(res.data.message);

      // SAVE USER
      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)
      );

      // SAVE TOKEN
      localStorage.setItem(

        "token",

        res.data.token
      );

      // REDIRECT
      if(loginType === "admin"){

        navigate("/admin");

      }else{

        navigate("/");
      }

    } catch (error) {

      console.log(error);

      toast.error(

        error?.response?.data?.message

        || "Login Failed"
      );
    }
  };

  return (

    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={handleSubmit}
      >

        <h1 className="auth-title">

          Welcome Back

        </h1>

        {/* LOGIN TYPE */}

        <div className="login-type">

          <button
            type="button"
            className={

              loginType === "user"

              ?

              "active-login-btn"

              :

              "login-btn-type"
            }

            onClick={()=>
            setLoginType("user")}
          >

            User Login

          </button>

          <button
            type="button"
            className={

              loginType === "admin"

              ?

              "active-login-btn"

              :

              "login-btn-type"
            }

            onClick={()=>
            setLoginType("admin")}
          >

            Admin Login

          </button>

        </div>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          className="auth-input"
          onChange={handleChange}
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          className="auth-input"
          onChange={handleChange}
        />

        {/* BUTTON */}

        <button className="auth-btn">

          Login

        </button>

        {/* BOTTOM */}

        <div className="auth-bottom">

          Don't have account?

          <Link
            to="/register"
            className="auth-link"
          >

            {" "}Register

          </Link>

        </div>

      </form>

    </div>
  );
}

export default Login;