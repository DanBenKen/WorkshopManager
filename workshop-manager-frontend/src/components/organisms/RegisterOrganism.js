import React, { useState, useEffect } from 'react';
import RegisterForm from '../molecules/RegisterForm';
import useAuth from '../../hooks/useAuth';
import useMessages from '../../hooks/useMessages';
import handleError from '../../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../containers/FormContainer';

const RegisterOrganism = () => {
    const { register, loading } = useAuth();
    const { successMessage, errorMessages, setSuccessMessage, setErrorMessages } = useMessages();
    const [registerData, setRegisterData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (registerData) => {
        setSuccessMessage('');
        setErrorMessages([]);

        try {
            await register(registerData);
            setSuccessMessage('Registration successful!');
        } catch (err) {
            const errors = handleError(err);
            setErrorMessages(errors);
        }
    };

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                navigate('/account/login');
            }, 1000);
        }
    }, [successMessage, navigate]);

    useEffect(() => {
        if (errorMessages.length > 0) {
            console.error('Registration error:', errorMessages);
        }
    }, [errorMessages]);

    return (
        <FormContainer
            title="Register"
            successMessage={successMessage}
            errorMessages={errorMessages}
        >
            <RegisterForm
                registerData={registerData}
                onChange={handleInputChange}
                onSubmit={handleRegister}
                loading={loading}
            />
        </FormContainer>
    );
};

export default RegisterOrganism;
