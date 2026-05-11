import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import "../styles/product.css";
import "../styles/productsPage.css";

function Products(){

    const [products,setProducts] = useState([]);

    const [filteredProducts,setFilteredProducts] = useState([]);

    const [search,setSearch] = useState("");

    const [category,setCategory] = useState("All");

    const [sort,setSort] = useState("");

    const getProducts = async()=>{

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data.products);

            setFilteredProducts(res.data.products);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getProducts();
    },[]);


    useEffect(()=>{

        let updatedProducts = [...products];

        // SEARCH
        if(search){

            updatedProducts = updatedProducts.filter((item)=>
                item.title.toLowerCase()
                .includes(search.toLowerCase())
            );
        }

        // CATEGORY
        if(category !== "All"){

            updatedProducts = updatedProducts.filter(
                (item)=>item.category === category
            );
        }

        // SORT
        if(sort === "low"){

            updatedProducts.sort(
                (a,b)=>a.price - b.price
            );
        }

        if(sort === "high"){

            updatedProducts.sort(
                (a,b)=>b.price - a.price
            );
        }

        setFilteredProducts(updatedProducts);

    },[search,category,sort,products]);

    return(
        <div className="products-page">

            <Navbar />

            <div className="products-wrapper">

                <div className="filters">

                    <h2 className="filter-title">
                        Filters
                    </h2>

                    <div className="filter-group">

                        <h3>Categories</h3>

                        <p
                            className="filter-item"
                            onClick={()=>setCategory("All")}
                        >
                            All
                        </p>

                        <p
                            className="filter-item"
                            onClick={()=>setCategory("Mobiles")}
                        >
                            Mobiles
                        </p>

                        <p
                            className="filter-item"
                            onClick={()=>setCategory("Shoes")}
                        >
                            Shoes
                        </p>

                        <p
                            className="filter-item"
                            onClick={()=>setCategory("Fashion")}
                        >
                            Fashion
                        </p>

                        <p
                            className="filter-item"
                            onClick={()=>setCategory("Electronics")}
                        >
                            Electronics
                        </p>

                    </div>

                </div>

                <div className="products-content">

                    <div className="products-top">

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="search-box"
                            value={search}
                            onChange={(e)=>
                                setSearch(e.target.value)
                            }
                        />

                        <select
                            className="sort-select"
                            onChange={(e)=>
                                setSort(e.target.value)
                            }
                        >

                            <option value="">
                                Sort By
                            </option>

                            <option value="low">
                                Price Low To High
                            </option>

                            <option value="high">
                                Price High To Low
                            </option>

                        </select>

                    </div>

                    {
                        filteredProducts.length > 0 ? (

                            <div className="products-grid">

                                {
                                    filteredProducts.map((product)=>(
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))
                                }

                            </div>

                        ) : (

                            <h1 className="no-products">
                                No Products Found
                            </h1>

                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Products;