import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import WorkersList from '../../components/organism/WorkersList';

const WorkersPage = () => {
    return (
        <TablePageLayout>
            <WorkersList></WorkersList>
        </TablePageLayout>
    );
};

export default WorkersPage;
