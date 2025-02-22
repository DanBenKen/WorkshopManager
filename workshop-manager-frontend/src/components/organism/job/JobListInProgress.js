import React, { useState } from 'react';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import usePagination from '../../../hooks/usePagination';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useNavigate } from 'react-router-dom';

const JobListInProgress = () => {
    const { jobs, isLoading, error } = useJobs(null, 'all');
    const [nameFilter, setNameFilter] = useState('');
    const navigate = useNavigate();

    const filteredJobs = jobs.filter((job) =>
        job.status === 'InProgress' && 
        (nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true)
    );

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 5);

    if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    const handleBack = () => {
        navigate(`/`);
    };

    return (
        <div className="mx-auto mt-5 px-4 py-8 bg-white shadow-md rounded-lg max-w-screen-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Jobs In Progress</h2>

            <div className="mb-4">
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by job name"
                    className={"mb-4 w-2/4"}
                />
            </div>

            <div className="divide-y divide-gray-200">
                {getPaginatedData(filteredJobs).map((job) => (
                    <div
                        key={job.id}
                        className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{job.jobName}</h3>
                        <p className="text-sm text-gray-500 mt-2">Status: In Progress</p>
                    </div>
                ))}
            </div>

            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                />
            </div>

            <div>
                <ButtonCancel
                    type="button"
                    disabled={isLoading}
                    onClick={handleBack}
                    className={'mt-5'}
                >
                    Go Back
                </ButtonCancel>
            </div>
        </div>
    );
};

export default JobListInProgress;
