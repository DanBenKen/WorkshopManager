import React from "react";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import WorkersCountWidget from "../components/organism/widget/WorkersCountWidget";
import SuppliesCountWidget from "../components/organism/widget/SuppliesCountWidget";
import JobsProgressWidget from "../components/organism/widget/JobsProgressWidget";

const AdminDashboardPage = () => {
    return (
        <AdminDashboardLayout>
            <WorkersCountWidget />
            <SuppliesCountWidget />
            <JobsProgressWidget />
        </AdminDashboardLayout>
    );
};

export default AdminDashboardPage;
