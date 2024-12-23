import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            setSuccess('');
            return;
        }

        try {
            const result = await AuthService.register(registerData);

            if (result) {
                setSuccess('Registration successful! Please login.');
                setError('');
                navigate('/login');
            } else {
                setError('Registration failed: ' + result?.message || 'Unknown error.');
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError('Error during registration. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="page-container">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
                <RegisterForm registerData={registerData} onChange={handleChange} onSubmit={handleSubmit} />
                {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-center mt-4 text-sm">{success}</p>}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-800 ml-2">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
