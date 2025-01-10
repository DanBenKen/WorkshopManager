import React from 'react';

const PaginationButton = ({ onClick, disabled, children, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-md ${className}`}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
