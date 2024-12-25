import React from 'react';
import SubmitButton from '../atoms/SubmitButton';

const RegisterForm = ({ registerData, onChange, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <input
                    type="text"
                    name="userName"
                    value={registerData.userName}
                    onChange={onChange}
                    placeholder="Username"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={onChange}
                    placeholder="Confirm Password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
            </div>
            <SubmitButton label="Register" disabled={loading} >
                {loading ? 'Registering...' : 'Register'}
            </SubmitButton>
        </form>
    );
};

export default RegisterForm;
