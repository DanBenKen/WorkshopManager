import React from 'react';

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
            {message}
        </div>
    );
};

export default SuccessMessage;
