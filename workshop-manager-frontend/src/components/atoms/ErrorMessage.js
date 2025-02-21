import React from 'react';

const ErrorMessage = ({ message }) => {
    if (!message || message.length === 0)
        return null;

    return (
        <div className="text-sm text-red-500">
            {Array.isArray(message) ? (
                <ul className="list-inside">
                    {message.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default ErrorMessage;
