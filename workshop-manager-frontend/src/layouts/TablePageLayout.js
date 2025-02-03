import React from 'react';

const TablePageLayout = ({ children }) => {
    return (
        <div className="flex justify-center items-center w-full bg-white rounded-lg max-w-full flex-wrap">
            {children}
        </div>
    );
};

export default TablePageLayout;
