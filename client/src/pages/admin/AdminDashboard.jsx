import AdminLayout
from "../../components/AdminLayout";

import "../../styles/dashboard.css";

function AdminDashboard(){

    return(
        <AdminLayout>

            <h1 className="dashboard-title">
                Dashboard
            </h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h2>
                        ₹ 1,25,000
                    </h2>

                    <p>
                        Total Sales
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        120
                    </h2>

                    <p>
                        Total Orders
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        45
                    </h2>

                    <p>
                        Products
                    </p>

                </div>

            </div>

        </AdminLayout>
    );
}

export default AdminDashboard;