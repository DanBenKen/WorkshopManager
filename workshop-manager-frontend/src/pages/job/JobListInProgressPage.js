import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import JobListInProgress from '../../components/organism/job/JobListInProgress';

const JobListInProgressPage = () => {
    return (
        <TablePageLayout>
            <JobListInProgress></JobListInProgress>
        </TablePageLayout>
    );
};

export default JobListInProgressPage;
