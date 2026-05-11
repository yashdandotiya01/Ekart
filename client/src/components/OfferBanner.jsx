import "../styles/offer.css";
import { Link } from "react-router-dom";

function OfferBanner(){

    return(
        <div className="offer-banner">

            <div>

                <p className="offer-small">
                    LIMITED OFFER
                </p>

                <h1>
                    Up To 50% OFF
                </h1>

                <Link to="/products">

                    <button className="hero-btn">

                        Shop Now

                    </button>

                </Link>

            </div>

        </div>
    );
}

export default OfferBanner;