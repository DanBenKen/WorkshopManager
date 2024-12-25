import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/molecules/LoginForm';
import useAuth from '../hooks/useAuth';
import "../assets/LoginRegisterStyle.css";

const LoginPage = () => {
    const { login, error, user } = useAuth();
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (loginData) => {
        await login(loginData);
    };

    useEffect(() => {
        if (user) {
            setSuccess('Login successful!');
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="page-container">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8">Please enter your credentials to login.</p>
                <LoginForm onLogin={handleLogin} />
                {error && <p className="text-red-500 text-center mt-6 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-center mt-6 text-sm">{success}</p>}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-800 ml-2">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
