import axios from "axios";

import { useState } from "react";

import toast from "react-hot-toast";

import AdminLayout
from "../../components/AdminLayout";

function AddProduct(){

    const [formData,setFormData] =
    useState({

        title:"",

        description:"",

        price:"",

        image:null,

        category:"",
    });

    // HANDLE INPUTS
    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:

            e.target.type === "file"

            ? e.target.files[0]

            : e.target.value
        });
    };

    // SUBMIT PRODUCT
    const handleSubmit = async(e)=>{

        e.preventDefault();

        try {

            const data = new FormData();

            data.append(
               "title",
               formData.title
            );

            data.append(
               "description",
               formData.description
            );

            data.append(
               "price",
               formData.price
            );

            data.append(
               "category",
               formData.category
            );

            data.append(
               "image",
               formData.image
            );

            await axios.post(

               "http://localhost:5000/api/products",

               data
            );

            toast.success(
               "Product Added Successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error(
               "Failed To Add Product"
            );
        }
    };

    return(

        <AdminLayout>

            <h1 className="dashboard-title">
                Add Product
            </h1>

            <form
                className="add-product-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                />

                <select
                    name="category"
                    onChange={handleChange}
                >

                    <option>
                        Select Category
                    </option>

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
                    Add Product
                </button>

            </form>

        </AdminLayout>
    );
}

export default AddProduct;