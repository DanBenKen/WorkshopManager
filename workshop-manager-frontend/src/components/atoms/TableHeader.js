import React from 'react';

const TableHeader = ({ children }) => {
    return (
        <thead className="bg-gray-200 text-gray-700">
            <tr>{children}</tr>
        </thead>
    );
};

export default TableHeader;
