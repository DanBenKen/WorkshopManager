import React from 'react';

const Label = ({ htmlFor, children }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium"
        >
            {children}
        </label>
    );
};

export default Label;
