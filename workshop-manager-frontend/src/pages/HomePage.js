import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import LogoutButton from '../components/LogoutButton';
import TransparentWhiteButton from '../components/TransparentWhiteButton';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate('/login');
        } catch (err) {
            console.error("Logout error:", err);
            alert('Error during logout. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="text-center text-white px-6 py-12">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Application</h1>
                <p className="text-lg mb-6">We are glad to have you here. Explore our features and get started today!</p>
                
                <div className="space-x-4 mb-8">
                    <TransparentWhiteButton aria-label="Get Started">
                        Get Started
                    </TransparentWhiteButton>
                    <TransparentWhiteButton aria-label="Learn More">
                        Learn More
                    </TransparentWhiteButton>
                </div>

                <div className="mt-8">
                    <LogoutButton
                        onClick={handleLogout}
                        > Logout
                    </LogoutButton>
                </div>
            </div>
        </div>
    );
};

export default Home;
