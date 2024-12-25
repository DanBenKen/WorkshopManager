import React, { useState } from 'react';
import SubmitButton from '../atoms/SubmitButton';

const LoginForm = ({ onLogin }) => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(loginData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <SubmitButton label="Login" />
        </form>
    );
};

export default LoginForm;
