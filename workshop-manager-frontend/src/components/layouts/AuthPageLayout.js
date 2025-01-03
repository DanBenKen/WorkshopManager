import React from 'react';

const AuthPageLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default AuthPageLayout;
