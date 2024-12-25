import React from 'react';

const SubmitButton = ({ label }) => {
    return (
        <button 
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
