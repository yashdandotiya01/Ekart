import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import "../styles/details.css";

function ProductDetails(){

    const {id} = useParams();

    const dispatch = useDispatch();

    const [product,setProduct] = useState(null);

    const handleCart = ()=>{

    dispatch(addToCart(product));

    toast.success("Added To Cart");
};

    const getSingleProduct = async()=>{

        try {

            const res = await axios.get(
                `http://localhost:5000/api/products/${id}`
            );

            setProduct(res.data.product);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getSingleProduct();
    },[]);

    if(!product){
        return <h1>Loading...</h1>
    }

    return(
        <>
            <Navbar />

            <div className="details-container">

                <img
                    src={product.image}
                    alt=""
                    className="details-image"
                />

                <div className="details-content">

                    <h1>
                        {product.title}
                    </h1>

                    <h2>
                        ₹ {product.price}
                    </h2>

                    <p>
                        {product.description}
                    </p>

                  <button
   className="cart-btn"
   onClick={handleCart}
>
   Add To Cart
</button>

                </div>

            </div>
        </>
    );
}

export default ProductDetails;