import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import SupplyListWithLowStock from '../../components/organism/supply/SupplyListWithLowStock';

const SupplyListWithLowStockPage = () => {
    return (
        <ListPageLayout>
            <SupplyListWithLowStock></SupplyListWithLowStock>
        </ListPageLayout>
    );
};

export default SupplyListWithLowStockPage;
