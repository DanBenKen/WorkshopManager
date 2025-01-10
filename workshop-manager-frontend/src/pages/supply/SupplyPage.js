import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import SupplyList from '../../components/organism/supply/SupplyList';

const SuppliesPage = () => {
    return (
        <TablePageLayout>
            <SupplyList></SupplyList>
        </TablePageLayout>
    );
};

export default SuppliesPage;
