import React from 'react';

const TablePageLayout = ({ children }) => {
    return (
        <div className="max-w-[1000px] mx-auto px-2 py-8 flex justify-center items-center w-full bg-white rounded-lg flex-wrap">
            {children}
        </div>
    );
};

export default TablePageLayout;
