import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Cart(){

    const {cartItems} = useSelector(
        (state)=>state.cart
    );

    return(
        <>
            <Navbar />

            <Link to="/checkout">

    <button
        style={{
            marginTop:"30px",
            padding:"14px 30px",
            background:"#00b894",
            color:"white",
            borderRadius:"10px",
        }}
    >
        Proceed To Checkout
    </button>

</Link>

            <div style={{padding:"50px"}}>

                <h1>
                    Cart Items
                </h1>

                {
                    cartItems.map((item)=>(
                        <div
                            key={item._id}
                            style={{
                                display:"flex",
                                gap:"20px",
                                marginTop:"20px",
                                alignItems:"center"
                            }}
                        >

                            <img
                                src={item.image}
                                width="100"
                            />

                            <div>
                                <h3>{item.title}</h3>

                                <p>
                                    ₹ {item.price}
                                </p>

                                <p>
                                    Qty : {item.quantity}
                                </p>
                            </div>

                        </div>
                    ))
                }

            </div>
        </>
    );
}

export default Cart;