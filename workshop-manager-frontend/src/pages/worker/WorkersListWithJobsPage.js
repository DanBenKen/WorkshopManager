import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import WorkerListWithJobs from '../../components/organism/worker/WorkerListWithJobs';

const WorkersListWithJobsPage = () => {
    return (
        <ListPageLayout>
            <WorkerListWithJobs></WorkerListWithJobs>
        </ListPageLayout>
    );
};

export default WorkersListWithJobsPage;
