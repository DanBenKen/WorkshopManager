import React from 'react';

const ListPageLayout = ({ children }) => {
    return (
        <div className="sm:p-8 p-5 w-full max-w-screen-xl">
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default ListPageLayout;
