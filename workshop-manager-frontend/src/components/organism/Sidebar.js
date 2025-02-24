import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const handleNavigation = (path) => {
        if (window.location.pathname === path) {
            window.location.reload();
        } else {
            navigate(path);
        }
        closeSidebar();
    };

    const handleLogoutClick = async () => {
        await handleLogout();
        navigate('/account/login');
    };

    return (
        <div className="flex h-screen">
            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                />
            )}

            <div
                className={`fixed z-50 bg-gray-800 text-white h-full w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 ${isSidebarOpen ? 'block' : 'hidden'} lg:block xl:block`}
            >
                <div className="text-center py-4">
                    <button onClick={() => handleNavigation('/')} className="text-2xl font-bold">Workshop Manager</button>
                </div>
                <ul>
                    <li>
                        <button onClick={() => handleNavigation('/')} className="w-full text-xl block mb-2 py-2 px-4 hover:bg-gray-700 text-left">Admin Dashboard</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/workers')} className="w-full block py-2 px-4 hover:bg-gray-700 text-left">Workers</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/supplies')} className="w-full block py-2 px-4 hover:bg-gray-700 text-left">Supplies</button>
                    </li>
                    <li>
                        <button onClick={() => handleNavigation('/jobs')} className="w-full block py-2 px-4 hover:bg-gray-700 text-left">Jobs</button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogoutClick}
                            className="mt-4 block py-2 px-4 hover:bg-gray-700 w-full text-left"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex-1 flex flex-col lg:ml-64">
                <div className="bg-gray-100 p-4 shadow lg:hidden">
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
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
