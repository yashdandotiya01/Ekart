import ProductCard from "./ProductCard";

import "../styles/categoryProducts.css";

function CategoryProducts({title,products}){

    return(
        <div className="category-products">

            <h1 className="section-title">
                {title}
            </h1>

            <div className="category-products-grid">

                {
                    products.map((product)=>(
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))
                }

            </div>

        </div>
    );
}

export default CategoryProducts;