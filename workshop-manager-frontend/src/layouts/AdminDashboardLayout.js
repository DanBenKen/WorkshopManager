import React from "react";

const AdminDashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-wrap gap-6 p-6 justify-center">
            {children}
        </div>
    );
};

export default AdminDashboardLayout;
