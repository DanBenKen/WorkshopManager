import React from 'react';

const PageNumberButton = ({ onClick, isActive, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
            {children}
        </button>
    );
};

export default PageNumberButton;
