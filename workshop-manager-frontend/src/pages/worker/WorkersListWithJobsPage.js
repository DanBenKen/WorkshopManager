import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import WorkerListWithJobs from '../../components/organism/worker/WorkerListWithJobs';

const WorkersListWithJobsPage = () => {
    return (
        <TablePageLayout>
            <WorkerListWithJobs></WorkerListWithJobs>
        </TablePageLayout>
    );
};

export default WorkersListWithJobsPage;
