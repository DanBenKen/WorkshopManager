import React from 'react';
import RegisterOrganism from '../../components/organisms/Register';
import AuthTemplate from '../../components/templates/AuthTemplate';

const RegisterPage = () => {
    return (
        <AuthTemplate>
            <RegisterOrganism />
        </AuthTemplate>
    );
};

export default RegisterPage;
