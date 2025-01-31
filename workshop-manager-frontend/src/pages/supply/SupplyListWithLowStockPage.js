import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import SupplyListWithLowStock from '../../components/organism/supply/SupplyListWithLowStock';

const SupplyListWithLowStockPage = () => {
    return (
        <TablePageLayout>
            <SupplyListWithLowStock></SupplyListWithLowStock>
        </TablePageLayout>
    );
};

export default SupplyListWithLowStockPage;
