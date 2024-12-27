import React from 'react';
import JobCreatePage from '../../components/organisms/JobCreate';

const JobCreatePageContainer = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">
                <JobCreatePage />
            </main>
        </div>
    );
};

export default JobCreatePageContainer;
