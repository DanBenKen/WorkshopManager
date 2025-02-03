import React from 'react';

const TableRow = ({ children }) => {
    return (
        <tr className="hover:bg-gray-100 text-sm md:text-base transition-colors">
            {children}
        </tr>
    );
};

export default TableRow;
