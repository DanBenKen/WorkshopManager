import React from 'react';

const TableCell = ({ children, className = '' }) => {
    return <td className={`border p-2 lg:p-3 ${className}`}>{children}</td>;
};

export default TableCell;
