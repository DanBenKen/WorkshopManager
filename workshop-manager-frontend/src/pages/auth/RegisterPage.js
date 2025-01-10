import React from 'react';
import AuthPageLayout from '../../layouts/FormPageLayout';
import RegisterForm from '../../components/organism/auth/RegisterForm';

const RegisterPage = () => {
    return (
        <AuthPageLayout title="Register for WorkshopManager">
            <RegisterForm />
        </AuthPageLayout>
    );
};

export default RegisterPage;
