import React from 'react';
import FormPageLayout from '../../layouts/FormPageLayout';
import JobFormModal from '../../components/organism/job/JobFormModal';

const JobFormPage = () => {
    return (
        <FormPageLayout>
            <JobFormModal></JobFormModal>
        </FormPageLayout>
    );
};

export default JobFormPage;
