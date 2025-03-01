import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import Button from '../atoms/Button';
import useMobileDetection from '../../hooks/useMobileDetection';
import { sidebarVariants, overlayVariants, pageTransition } from '../../animations/sidebarAnimation';

const Sidebar = () => {
    const { isMobile, sidebarOpen: isSidebarOpen, setSidebarOpen } = useMobileDetection();
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const location = useLocation();

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

    const sidebarButtonsStyle = "block py-2 px-4 bg-gray-800 hover:bg-gray-700 w-full text-left rounded-none bg-transparent hover:bg-transparent";

    const navItems = [
        { label: 'Admin Dashboard', path: '/' },
        { label: 'Workers', path: '/workers' },
        { label: 'Supplies', path: '/supplies' },
        { label: 'Jobs', path: '/jobs' }
    ];

    return (
        <div className="flex h-screen">
            <AnimatePresence>
                {isSidebarOpen && isMobile && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={overlayVariants}
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black z-40"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="fixed z-50 bg-gray-800 text-white h-full w-64 lg:translate-x-0"
                initial={false}
                animate={isMobile ? (isSidebarOpen ? "open" : "closed") : "open"}
                variants={sidebarVariants}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <div className="text-center py-4">
                    <Button
                        onClick={() => handleNavigation('/')}
                        className="text-2xl font-bold bg-transparent hover:bg-transparent"
                        variants={{ hover: { scale: 1.05 }, tap: { scale: 0.95 } }}
                    >
                        Workshop Manager
                    </Button>
                </div>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Button
                                onClick={() => handleNavigation(item.path)}
                                className={sidebarButtonsStyle}
                            >
                                {item.label}
                            </Button>
                        </li>
                    ))}
                    <li>
                        <Button
                            onClick={handleLogoutClick}
                            className={`mt-4 ${sidebarButtonsStyle}`}
                        >
                            Logout
                        </Button>
                    </li>
                </ul>
            </motion.div>

            <div className="flex-1 flex flex-col lg:ml-64">
                <div className="bg-gray-100 p-4 shadow lg:hidden">
                    <Button
                        onClick={toggleSidebar}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                    >
                        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </Button>
                </div>

                <motion.div
                    key={location.pathname}
                    {...pageTransition}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
};

export default Sidebar;
