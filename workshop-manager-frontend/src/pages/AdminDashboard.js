import React from "react";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import WorkersCountWidget from "../components/organism/widget/WorkersCountWidget";
import SuppliesCountWidget from "../components/organism/widget/SuppliesCountWidget";

const AdminDashboard = () => {
    return (
        <AdminDashboardLayout>
            <WorkersCountWidget />
            <SuppliesCountWidget />
        </AdminDashboardLayout>
    );
};

export default AdminDashboard;
