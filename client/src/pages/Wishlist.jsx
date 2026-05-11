import { useDispatch,useSelector }
from "react-redux";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
   removeFromWishlist
} from "../redux/wishlistSlice";

import "../styles/wishlist.css";

function Wishlist(){

    const dispatch = useDispatch();

    const {wishlistItems} = useSelector(
        (state)=>state.wishlist
    );

    const removeItem = (id)=>{

        dispatch(removeFromWishlist(id));

        toast.success("Removed");
    };

    return(
        <>
            <Navbar />

            <div className="wishlist-page">

                <h1 className="section-title">
                    My Wishlist
                </h1>

                <div className="wishlist-grid">

                    {
                        wishlistItems.map((item)=>(

                            <div
                                className="wishlist-card"
                                key={item._id}
                            >

                                <img
                                    src={item.image}
                                    alt=""
                                />

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    ₹ {item.price}
                                </p>

                                <button
                                    onClick={()=>
                                    removeItem(item._id)}
                                >
                                    Remove
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>
        </>
    );
}

export default Wishlist;