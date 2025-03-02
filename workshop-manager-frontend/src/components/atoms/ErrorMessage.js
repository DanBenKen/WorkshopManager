import React from 'react';

const ErrorMessage = ({ message, className }) => {    
    return (
        <div className={`text-sm text-red-500 h-4 mb-2 transition-all duration-300 ${className}`}>
            {message ? (
                Array.isArray(message) ? (
                    <ul className="list-inside">
                        {message.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{message}</p>
                )
            ) : null}
        </div>
    );
};

export default ErrorMessage;
