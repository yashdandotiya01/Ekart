import { Link } from "react-router-dom";

import { FaShoppingBag } from "react-icons/fa";

import "../styles/navbar.css";

function Navbar(){
const user =
JSON.parse(localStorage.getItem("user"));
    return(
        <nav className="navbar">

            <Link to="/" className="logo">

                <FaShoppingBag className="logo-icon" />

                <span>
                    EKART
                </span>

            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                {
   user ? (

      <div className="user-section">

         <span className="username">
            {
   user.role === "admin"
   ?
   "Admin"
   :
   user.name
}
         </span>

         <button
            className="logout-btn"
            onClick={()=>{

               localStorage.removeItem("user");

               localStorage.removeItem("token");

               window.location.reload();
            }}
         >
            Logout
         </button>

      </div>

   ) : (

      <Link to="/login">
         Login
      </Link>
   )
}

                <Link to="/cart">
                    Cart
                </Link>
                <Link to="/wishlist">
   Wishlist
</Link>
                 <Link to="/orders">
   Orders
</Link>
{
   user?.role === "admin" && (

      <Link to="/admin">
         Admin
      </Link>
   )
}
            </div>

        </nav>
    );
}

export default Navbar;