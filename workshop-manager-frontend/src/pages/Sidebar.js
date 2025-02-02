import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen">
            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                />
            )}

            <div
                className={`fixed z-50 bg-gray-800 text-white h-full w-64 transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 ${isSidebarOpen ? 'block' : 'hidden'} lg:block xl:block`}
            >
                <div className="text-center py-4">
                    <Link to="/" className="text-2xl font-bold">Workshop Manager</Link>
                </div>
                <ul>
                    <li>
                        <Link to="/" className="text-xl block mb-2 py-2 px-4 hover:bg-gray-700">Admin Dashboard</Link>
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
                        <Link to="/account/login" className="mt-4 block py-2 px-4 hover:bg-gray-700">Logout</Link>
                    </li>
                </ul>
            </div>

            <div className="flex-1 flex flex-col lg:ml-64">
                <div className="bg-gray-100 p-4 shadow lg:hidden">
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>

                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
