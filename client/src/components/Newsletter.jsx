import "../styles/newsletter.css";

function Newsletter(){

    return(
        <div className="newsletter">

            <h1>
                Subscribe To Our Newsletter
            </h1>

            <p>
                Get latest offers and updates
            </p>

            <div className="newsletter-box">

                <input
                    type="email"
                    placeholder="Enter Email"
                />

                <button>
                    Subscribe
                </button>

            </div>

        </div>
    );
}

export default Newsletter;