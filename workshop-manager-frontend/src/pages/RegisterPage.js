import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import RegisterForm from '../components/molecules/RegisterForm';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            setSuccess('');
            return setError('Passwords do not match');
        }

        try {
            await register(registerData);

            setSuccess('Registration successful! Please login.');
            setError('');
            setRegisterData({
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
            navigate('/login');
        } catch (err) {
            setSuccess('');
            setError('Error during registration. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
                <RegisterForm
                    registerData={registerData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
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
