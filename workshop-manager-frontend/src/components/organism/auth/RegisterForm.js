import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import { useNavigate, Link } from 'react-router-dom';
import useValidation from '../../../hooks/useValidation';
import { validateRegistration } from '../../../utils/validators';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

const RegisterForm = () => {
    const { handleRegister, authError, setAuthError } = useAuth();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const navigate = useNavigate();

    const {
        values: { username, email, password, confirmPassword },
        errors,
        handleChange,
        resetErrors,
        validateForm,
    } = useValidation({ username: '', email: '', password: '', confirmPassword: '' }, validateRegistration);

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        setAuthError(null);
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) return;
    
        setIsButtonLoading(true);
        const success = await handleRegister({ username, email, password, confirmPassword });
    
        if (success) {
            toast.success("Registration successful!", { 
                autoClose: 1500,
                position: 'top-center'
            });
            setTimeout(() => navigate('/account/login'), 2000);
        } else {
            setIsButtonLoading(false);
            
            if (authError?.general) {
                authError.general.forEach((message) => {
                    toast.error(message, {
                        autoClose: 2000,
                        position: 'top-center',
                        className: 'border-2 border-red-500'
                    });
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center mt-10 p-5">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Register to Your Workshop</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded">
                    <FormField
                        label="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        errorMessage={errors.username || authError?.username}
                        required
                    />
                    <FormField
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        errorMessage={errors.email || authError?.email}
                        required
                    />
                    <FormField
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        errorMessage={errors.password || authError?.password}
                        required
                    />
                    <FormField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        errorMessage={errors.confirmPassword || authError?.confirmPassword}
                        required
                    />

                    <Button type="submit" disabled={isButtonLoading} className="w-full flex items-center justify-center mt-5">
                        {isButtonLoading ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            'Register'
                        )}
                    </Button>

                    <div className="mt-4 text-center">
                        <p className="text-sm md:text-base">
                            Already have an account?{' '}
                            <Link to="/account/login" className="text-blue-600 hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
