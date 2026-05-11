import "../styles/brands.css";

function Brands(){

    const brands = [
        "Nike",
        "Apple",
        "Samsung",
        "Sony",
        "Adidas",
        "Zara"
    ];

    return(
        <div className="brands">

            <h1 className="section-title">
                Top Brands
            </h1>

            <div className="brands-container">

                {
                    brands.map((brand,index)=>(
                        <div
                            className="brand-card"
                            key={index}
                        >
                            {brand}
                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Brands;