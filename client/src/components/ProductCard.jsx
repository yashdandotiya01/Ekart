import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import {
   addToWishlist
} from "../redux/wishlistSlice";

import "../styles/product.css";

function ProductCard({product}){

    const dispatch = useDispatch();

    const handleWishlist = ()=>{

        dispatch(addToWishlist(product));

        toast.success("Added To Wishlist");
    };

    return(
        <div className="product-card">

            <div className="product-image-container">

                <img
                    src={product.image}
                    alt=""
                    className="product-image"
                />

                <button
                    className="wishlist-btn"
                    onClick={handleWishlist}
                >
                    <FaHeart />
                </button>

                {
                    product.featured &&
                    <span className="featured-badge">
                        Featured
                    </span>
                }

            </div>

            <div className="product-content">

                <p className="product-brand">
                    {product.brand}
                </p>

                <h3 className="product-title">
                    {product.title}
                </h3>

                <div className="rating">
                    ⭐ {product.rating}
                </div>

                <p className="product-price">
                    ₹ {product.price}
                </p>

                <Link to={`/product/${product._id}`}>

                    <button className="view-btn">
                        View Details
                    </button>

                </Link>

            </div>

        </div>
    );
}

export default ProductCard;