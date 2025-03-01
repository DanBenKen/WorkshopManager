import React from 'react';
import WorkerList from '../../components/organism/worker/WorkerList';
import ListPageLayout from '../../layouts/ListPageLayout';

const WorkersPage = () => {
    return (
        <ListPageLayout>
            <WorkerList></WorkerList>
        </ListPageLayout>
    );
};

export default WorkersPage;
