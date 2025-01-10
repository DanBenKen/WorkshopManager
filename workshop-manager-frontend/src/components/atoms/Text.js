import React from 'react';

const Text = ({ content, className }) => {
    return <p className={`text-gray-600 ${className}`}>{content}</p>;
};

export default Text;
