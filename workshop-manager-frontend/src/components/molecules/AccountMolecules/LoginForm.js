import React, { useState } from 'react';
import Button from '../../atoms/Button';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, isSubmitting, error }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const fields = [
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'password', type: 'password', label: 'Password' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onLogin(loginData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border-none">
            {fields.map(({ name, type, label }) => (
                <div key={name} className="relative">
                    <input
                        type={type}
                        name={name}
                        value={loginData[name]}
                        onChange={handleChange}
                        placeholder={label}
                        required
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                    />
                    <label
                        htmlFor={name}
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                        {label}
                    </label>

                    {error && error[name] && Array.isArray(error[name]) && (
                        <div className="border-y-0 text-red-600 text-sm">{error[name][0]}</div>
                    )}
                </div>
            ))}

            <Button
                type="submit"
                className={`w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white`}
                label={isSubmitting ? 'Logging in...' : 'Login'}
                disabled={isSubmitting}
            />

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/account/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
