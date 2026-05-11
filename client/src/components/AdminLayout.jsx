import { Link } from "react-router-dom";

import "../styles/admin.css";

function AdminLayout({children}){

    return(
        <div className="admin-layout">

            <div className="admin-sidebar">

                <h1>
                    EKART ADMIN
                </h1>

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/add-product">
                    Add Product
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

            </div>

            <div className="admin-content">

                {children}

            </div>

        </div>
    );
}

export default AdminLayout;