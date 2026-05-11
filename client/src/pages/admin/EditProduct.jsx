import axios from "axios";

import {

   useEffect,

   useState

} from "react";

import {

   useNavigate,

   useParams

} from "react-router-dom";

import toast from "react-hot-toast";

import AdminLayout
from "../../components/AdminLayout";

function EditProduct(){

    const navigate = useNavigate();

    const {id} = useParams();

    const [formData,setFormData] =
    useState({

        title:"",

        description:"",

        price:"",

        category:"",
    });

    // GET PRODUCT
    const getProduct = async()=>{

        try {

            const res = await axios.get(

                `http://localhost:5000/api/products/${id}`
            );

            setFormData({

                title:
                res.data.product.title,

                description:
                res.data.product.description,

                price:
                res.data.product.price,

                category:
                res.data.product.category,
            });

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(()=>{

        getProduct();

    },[]);

    // HANDLE INPUTS
    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value,
        });
    };

    // UPDATE PRODUCT
    const handleSubmit = async(e)=>{

        e.preventDefault();

        try {

            await axios.put(

                `http://localhost:5000/api/products/${id}`,

                formData
            );

            toast.success(
                "Product Updated"
            );

            navigate("/admin/products");

        } catch (error) {

            console.log(error);

            toast.error(
                "Update Failed"
            );
        }
    };

    return(

        <AdminLayout>

            <h1 className="dashboard-title">
                Edit Product
            </h1>

            <form
                className="add-product-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >

                    <option value="Mobiles">
                        Mobiles
                    </option>

                    <option value="Shoes">
                        Shoes
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                </select>

                <button>
                    Update Product
                </button>

            </form>

        </AdminLayout>
    );
}

export default EditProduct;