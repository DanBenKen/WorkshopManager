import React from "react";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import WorkersCountWidget from "../components/organism/widget/WorkersCountWidget";

const AdminDashboard = () => {
    return (
        <AdminDashboardLayout>
            <WorkersCountWidget />
            <WorkersCountWidget />  
            <WorkersCountWidget />
            <WorkersCountWidget />
        </AdminDashboardLayout>
    );
};

export default AdminDashboard;
