import React from 'react';

const TableHeader = ({ children }) => {
    return (
        <thead className="bg-gray-600 text-white">
            <tr>{children}</tr>
        </thead>
    );
};

export default TableHeader;
