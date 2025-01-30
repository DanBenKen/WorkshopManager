import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import WorkerListWithoutJobs from '../../components/organism/worker/WorkerListWithoutJobs';

const WorkersListWithoutJobsPage = () => {
    return (
        <TablePageLayout>
            <WorkerListWithoutJobs></WorkerListWithoutJobs>
        </TablePageLayout>
    );
};

export default WorkersListWithoutJobsPage;
