import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import WorkerList from '../../components/organism/worker/WorkerList';

const WorkersPage = () => {
    return (
        <TablePageLayout>
            <WorkerList></WorkerList>
        </TablePageLayout>
    );
};

export default WorkersPage;
