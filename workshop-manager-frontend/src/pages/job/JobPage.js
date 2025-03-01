import React from 'react';
import ListPageLayout from '../../layouts/ListPageLayout';
import JobList from '../../components/organism/job/JobList';

const JobPage = () => {
    return (
        <ListPageLayout>
            <JobList></JobList>
        </ListPageLayout>
    );
};

export default JobPage;
