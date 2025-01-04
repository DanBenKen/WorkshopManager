import React from 'react';

const Table = ({ children }) => {
    return (
        <table className="border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            {children}
        </table>
    );
};

export default Table;
