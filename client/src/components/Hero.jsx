import "../styles/hero.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();
    return (
        <div className="hero">

            <div className="hero-left">

                <p className="hero-subtitle">
                    BEST ONLINE STORE
                </p>

                <h1 className="hero-title">
                    Discover Latest
                    Fashion & Tech
                </h1>

                <p className="hero-desc">
                    Shop premium quality products
                    with best prices and fast delivery.
                </p>

                <Link to="/products">

                    <button className="hero-btn">

                        Shop Now

                    </button>

                </Link>
            </div>

            <div className="hero-right">

                <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt=""
                />

            </div>

        </div>
    );
}

export default Hero;