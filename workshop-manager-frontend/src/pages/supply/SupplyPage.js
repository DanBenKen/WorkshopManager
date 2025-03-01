import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import SupplyList from '../../components/organism/supply/SupplyList';

const SuppliesPage = () => {
    return (
        <ListPageLayout>
            <SupplyList></SupplyList>
        </ListPageLayout>
    );
};

export default SuppliesPage;
