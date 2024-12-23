import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AuthService from '../services/AuthService';
import "../assets/LoginRegisterStyle.css";

const LoginPage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (loginData) => {
        try {
            const result = await AuthService.login(loginData);

            if (result && result.token) {
                setSuccess('Login successful!');
                navigate('/');
            } else {
                setError('Invalid login attempt.');
            }
        } catch (err) {
            setError('Error during login. Please try again.');
        }
    };

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
