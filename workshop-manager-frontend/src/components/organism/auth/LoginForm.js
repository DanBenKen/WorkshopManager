import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';
import { useNavigate, Link } from 'react-router-dom';
import useValidation from '../../../hooks/useValidation';
import { validateLogin } from '../../../utils/validators';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

const LoginForm = () => {
    const { handleLogin, authError } = useAuth();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const {
        values: { email, password },
        errors,
        handleChange,
        resetErrors,
        validateForm,
    } = useValidation({ email: '', password: '' }, validateLogin);

    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrors();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) return;

        setIsButtonLoading(true);

        const { success, errors } = await handleLogin({ email, password, rememberMe }, rememberMe);

        if (success) {
            toast.success('Login successful!', { autoClose: 1500 });
            setTimeout(() => navigate('/'), 2000);
        } else {
            setIsButtonLoading(false);

            if (errors?.general) {
                errors.general.forEach((message) => {
                    toast.error(message, {
                        autoClose: 1000,
                        position: 'top-center',
                    });
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center mt-10 p-5">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center text-gray-800 m-2">Log in to Your Workshop</h2>
                    <FormField
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        errorMessage={errors.email || authError?.email}
                        autoComplete="username"
                        required
                    />
                    <FormField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        errorMessage={errors.password || authError?.password}
                        autoComplete="current-password"
                        required
                    />
                    <FormField
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        label={"Remember Me"}
                    />

                    <Button type="submit" disabled={isButtonLoading} className="w-full flex items-center justify-center mt-5">
                        {isButtonLoading ? (
                            <FaSpinner className="animate-spin mr-2" />
                        ) : (
                            'Log in'
                        )}
                    </Button>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/account/register" className="text-blue-600 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
