import React from 'react';
import FormPageLayout from '../../layouts/FormPageLayout';
import WorkerForm from '../../components/organism/worker/WorkerFormModal';

const WorkersFormPage = () => {
    return (
        <FormPageLayout>
            <WorkerForm></WorkerForm>
        </FormPageLayout>
    );
};

export default WorkersFormPage;
