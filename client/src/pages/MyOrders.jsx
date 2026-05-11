import axios from "axios";

import { useEffect,useState }
from "react";

import Navbar from "../components/Navbar";

import "../styles/orders.css";

function MyOrders(){

    const [orders,setOrders] = useState([]);

    const getOrders = async()=>{

        try {

            const res = await axios.get(
                "http://localhost:5000/api/payment/orders"
            );

            setOrders(res.data.orders);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(()=>{
        getOrders();
    },[]);

    return(
        <>
            <Navbar />

            <div className="orders-page">

                <h1 className="section-title">
                    My Orders
                </h1>

                {
                    orders.map((order)=>(

                        <div
                            className="order-card"
                            key={order._id}
                        >

                            <div className="order-top">

                                <h3>
                                    Order ID:
                                    {order.orderId}
                                </h3>

                                <span>
                                    {order.status}
                                </span>

                            </div>

                            <h2>
                                ₹ {order.totalAmount}
                            </h2>

                            <div className="order-products">

                                {
                                    order.products.map(
                                    (item,index)=>(

                                        <div
                                            className="order-product"
                                            key={index}
                                        >

                                            <img
                                                src={item.image}
                                                alt=""
                                            />

                                            <div>

                                                <p>
                                                    {item.title}
                                                </p>

                                                <p>
                                                    ₹ {item.price}
                                                </p>

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    ))
                }

            </div>
        </>
    );
}

export default MyOrders;