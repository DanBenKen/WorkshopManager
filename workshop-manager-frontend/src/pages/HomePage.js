import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleJobCreateClick = () => {
        navigate('/job/create');
    };

    const handleJobIndexClick = () => {
        navigate('/job');
    };

    const handleLogoutClick = async () => {
        await logout();
        navigate('/account/login');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r">
            <div className="text-center text-white px-6 py-12">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Application</h1>
                {user && <p className="text-lg mb-6">Logged in as: <span className="font-semibold">{user.email}</span></p>}
                <p className="text-lg mb-6">We are glad to have you here. Explore our features and get started today!</p>

                <div className="space-x-4 mb-8">
                    <Button
                        label="Job Index"
                        aria-label="Get Started"
                        onClick={handleJobIndexClick}>
                    </Button>
                    <Button
                        label="Create Job"
                        aria-label="Job page"
                        onClick={handleJobCreateClick}>
                    </Button>
                </div>

                <Button
                    label="Logout"
                    aria-label="Logout"
                    onClick={handleLogoutClick}
                    className="bg-red-500 hover:bg-red-600">
                </Button>
            </div>
        </div>
    );
};

export default Home;
