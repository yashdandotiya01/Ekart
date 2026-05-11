import axios from "axios";

import { useSelector } from "react-redux";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import "../styles/checkout.css";

function Checkout(){

   const {cartItems} = useSelector(
    (state)=>state.cart
);

const totalAmount =
cartItems.reduce(
    (acc,item)=>
    acc + item.price * item.quantity,
    0
);

console.log(cartItems);

console.log(totalAmount);

    const handlePayment = async()=>{

        try {

            // CREATE ORDER
            const {data} = await axios.post(
                "http://localhost:5000/api/payment/create-order",
                {
                    amount:totalAmount,
                }
            );

            const options = {

                key:
                "rzp_test_SmmUJMpzCgDp8e",

                amount:data.order.amount,

                currency:"INR",

                name:"EKART",

                description:"Order Payment",

                order_id:data.order.id,

              handler: async(response)=>{

    try {

        console.log(response);

        const verifyRes =
        await axios.post(
            "http://localhost:5000/api/payment/verify",
            {

                ...response,

                cartItems,

                totalAmount,
            }
        );

        console.log(verifyRes);

        toast.success(
            verifyRes.data.message
        );

    } catch (error) {

        console.log(error);

        toast.error("Verification Failed");
    }
},

                theme:{
                    color:"#00b894",
                },
            };

            const razor =
            new window.Razorpay(options);

            razor.open();

        } catch (error) {

    console.log(error);

    console.log(error.response);

    toast.error(
        error?.response?.data?.message
        || "Payment Failed"
    );
}
    };

    return(
        <>
            <Navbar />

            <div className="checkout-page">

                <div className="checkout-box">

                    <h1>
                        Checkout
                    </h1>

                    <div className="checkout-items">

                        {
                            cartItems.map((item)=>(

                                <div
                                    className="checkout-item"
                                    key={item._id}
                                >

                                    <img
                                        src={item.image}
                                        alt=""
                                    />

                                    <div>

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            ₹ {item.price}
                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                    <h2>
                        Total: ₹ {totalAmount}
                    </h2>

                    <button
                        className="pay-btn"
                        onClick={handlePayment}
                    >
                        Pay Now
                    </button>

                </div>

            </div>
        </>
    );
}

export default Checkout;