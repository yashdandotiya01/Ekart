import axios from "axios";

import {
   useEffect,
   useState
}
from "react";

import AdminLayout
from "../../components/AdminLayout";

function AdminOrders(){

    const [orders,setOrders] =
    useState([]);

    const getOrders = async()=>{

        const res = await axios.get(
            "http://localhost:5000/api/payment/orders"
        );

        setOrders(res.data.orders);
    };

    useEffect(()=>{
        getOrders();
    },[]);

    return(
        <AdminLayout>

            <h1 className="dashboard-title">
                Orders
            </h1>

            {
                orders.map((order)=>(

                    <div
                        className="order-card"
                        key={order._id}
                    >

                        <h3>
                            {order.orderId}
                        </h3>

                        <h2>
                            ₹ {order.totalAmount}
                        </h2>

                        <p>
                            {order.status}
                        </p>

                    </div>
                ))
            }

        </AdminLayout>
    );
}

export default AdminOrders;