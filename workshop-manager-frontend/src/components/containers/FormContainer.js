import React from 'react';

const FormContainer = ({ title, successMessage, errorMessages, children }) => {
    return (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-semibold text-center">{title}</h1>
                    <div className="divide-y divide-gray-200 py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        {successMessage && (
                            <div className="text-center mb-4 text-green-600">
                                {successMessage}
                            </div>
                        )}

                        {errorMessages.length > 0 && (
                            <div className="text-center mb-4 text-red-600">
                                {errorMessages.map((msg, index) => (
                                    <p key={index}>{msg}</p>
                                ))}
                            </div>
                        )}

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
