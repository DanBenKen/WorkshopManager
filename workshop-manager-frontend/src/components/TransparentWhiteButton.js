import React from 'react';

const TransparentWhiteButton = ({ onClick, children, ariaLabel }) => {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white font-semibold rounded-lg shadow-md hover:text-gray-800"
            aria-label="Learn More"
        >
            {children}
        </button>
    );
};

export default TransparentWhiteButton;
