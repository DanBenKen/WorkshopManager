import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import JobListInProgress from '../../components/organism/job/JobListInProgress';

const JobListInProgressPage = () => {
    return (
        <ListPageLayout>
            <JobListInProgress></JobListInProgress>
        </ListPageLayout>
    );
};

export default JobListInProgressPage;
