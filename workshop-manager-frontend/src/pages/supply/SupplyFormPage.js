import React from 'react';
import FormPageLayout from '../../layouts/FormPageLayout';
import SupplyForm from '../../components/organism/supply/SupplyFormModal';

const SupplyFormPage = () => {
    return (
        <FormPageLayout>
            <SupplyForm></SupplyForm>
        </FormPageLayout>
    );
};

export default SupplyFormPage;
