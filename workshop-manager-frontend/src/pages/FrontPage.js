import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../components/services/authService';
import Button from '../components/atoms/Button';

const FrontPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/account/login');
    };

    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold my-4">Welcome to WorkshopManager</h1>            
            <div className="space-x-4">
                <Link
                    to="/jobs"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                    Jobs
                </Link>
                <Link
                    to="/supplies"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
                >
                    Supplies
                </Link>
                <Link
                    to="/workers"
                    className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-500"
                >
                    Workers
                </Link>
            </div>

            <div className="mt-8">
                <Button
                    onClick={handleLogout}
                    className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default FrontPage;
