import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import WorkerListWithoutJobs from '../../components/organism/worker/WorkerListWithoutJobs';

const WorkersListWithoutJobsPage = () => {
    return (
        <ListPageLayout>
            <WorkerListWithoutJobs></WorkerListWithoutJobs>
        </ListPageLayout>
    );
};

export default WorkersListWithoutJobsPage;
