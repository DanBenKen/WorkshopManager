import React from 'react';
import TablePageLayout from '../../layouts/TablePageLayout';
import JobList from '../../components/organism/job/JobList';

const JobPage = () => {
    return (
        <TablePageLayout>
            <JobList></JobList>
        </TablePageLayout>
    );
};

export default JobPage;
