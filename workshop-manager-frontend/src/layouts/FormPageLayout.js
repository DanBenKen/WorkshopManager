import React from 'react';

const FormPageLayout = ({ title, children }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg">
                <h1 className="text-2xl font-semibold text-center">{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default FormPageLayout;
