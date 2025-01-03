import React from 'react';
import RegisterForm from '../../components/organism/RegisterForm';
import AuthPageLayout from '../../components/layouts/AuthPageLayout';

const RegisterPage = () => {
    return (
        <AuthPageLayout title="Register for WorkshopManager">
            <RegisterForm />
        </AuthPageLayout>
    );
};

export default RegisterPage;
