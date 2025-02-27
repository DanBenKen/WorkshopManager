import React, { useState, useMemo } from 'react';
import useJobs from '../../../hooks/useJobs';
import ErrorMessage from '../../atoms/ErrorMessage';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import usePagination from '../../../hooks/usePagination';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useLocation, useNavigate } from 'react-router-dom';
import CardData from '../../molecules/CardData';

const JobListInProgress = () => {
    const { jobs, isLoading, error } = useJobs(null, 'all');
    const [nameFilter, setNameFilter] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) =>
            job.status === 'InProgress' &&
            (nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true)
        );
    }, [jobs, nameFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 5);

    const paginatedData = useMemo(() => getPaginatedData(filteredJobs), [getPaginatedData, filteredJobs]);

    const handleBack = () => { navigate(location.state?.from || "/jobs"); };

    if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

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

            {filteredJobs.length === 0 ? (
                <p className="mt-3 text-center text-gray-600">No results found</p>
            ) : (
                <CardData
                    data={paginatedData}
                    renderItem={(job) => ({
                        title: job.jobName,
                        description: `Status: ${job.status}`,
                        id: `ID: ${job.id}`
                    })}
                />
            )}

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
