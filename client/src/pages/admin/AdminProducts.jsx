import axios from "axios";
import { Link }
    from "react-router-dom";
import {
    useEffect,
    useState
}
    from "react";

import toast from "react-hot-toast";

import AdminLayout
    from "../../components/AdminLayout";

function AdminProducts() {

    const [products, setProducts] =
        useState([]);

    const getProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products"
            );

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteProduct = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/api/products/${id}`
            );

            toast.success(
                "Product Deleted"
            );

            getProducts();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <AdminLayout>

            <h1 className="dashboard-title">
                Products
            </h1>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Title</th>

                        <th>Price</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.map((item) => (

                            <tr key={item._id}>

                                <td>

                                    <img
                                        src={item.image}
                                        width="70"
                                    />

                                </td>

                                <td>
                                    {item.title}
                                </td>

                                <td>
                                    ₹ {item.price}
                                </td>

                                <td>

                                    <Link
                                        to={`/admin/edit-product/${item._id}`}
                                    >

                                        <button
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>

                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteProduct(item._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </AdminLayout>
    );
}

export default AdminProducts;