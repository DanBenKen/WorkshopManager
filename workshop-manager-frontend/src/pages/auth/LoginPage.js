import React from 'react';
import LoginForm from '../../components/organism/LoginForm';
import AuthPageLayout from '../../layouts/FormPageLayout';

const LoginPage = () => {
    return (
        <AuthPageLayout title="Login to WorkshopManager">
            <LoginForm />
        </AuthPageLayout>
    );
};

export default LoginPage;
