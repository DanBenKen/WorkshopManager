import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 bg-gray-800 text-white h-screen">
                <div className="text-center py-4">
                    <h1 className="text-2xl font-bold">Workshop Manager</h1>
                </div>
                <ul>
                    <li>
                        <Link to="/" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/workers" className="block py-2 px-4 hover:bg-gray-700">Workers</Link>
                    </li>
                    <li>
                        <Link to="/supplies" className="block py-2 px-4 hover:bg-gray-700">Supplies</Link>
                    </li>
                    <li>
                        <Link to="/jobs" className="block py-2 px-4 hover:bg-gray-700">Jobs</Link>
                    </li>
                    <li>
                        <Link to="/account/login" className="block py-2 px-4 hover:bg-gray-700">Logout</Link>
                    </li>
                </ul>
            </div>

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
