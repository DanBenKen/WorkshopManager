import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import SuppliesList from '../../components/organism/supply/SuppliesList';

const SuppliesPage = () => {
    return (
        <TablePageLayout>
            <SuppliesList></SuppliesList>
        </TablePageLayout>
    );
};

export default SuppliesPage;
