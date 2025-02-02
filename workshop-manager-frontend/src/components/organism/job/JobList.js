import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useJobs from '../../../hooks/useJobs';
import List from '../../molecules/List';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';

const JobList = () => {
    const { jobs, isLoading, error, handleSetCompleted } = useJobs();
    const [nameFilter, setNameFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    const filteredJobs = jobs.filter((job) => {
        const matchesName = nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesStatus = statusFilter ? job.status === statusFilter : true;
        return matchesName && matchesStatus;
    });

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 5);

    const handleDetails = (job) => {
        navigate(`/jobs/details/${job.id}`);
    };

    const handleComplete = (job) => {
        if (job.status === 'InProgress') {
            return {
                label: 'Complete Job',
                onClick: () => handleSetCompleted(job),
                requiresInput: false,
            };
        }
        return null;
    };

    const columns = [
        { label: 'Job Name', field: 'jobName' },
        { label: 'Description', field: 'description' },
        { label: 'Status', field: 'status' },
    ];

    const statusOptions = [
        { label: 'In Progress', value: 'InProgress' },
        { label: 'Completed', value: 'Completed' },
    ];

    return (
        <div className="mx-auto p-2">
            <h2 className="text-3xl font-bold mb-4">Jobs</h2>
            <Link to="/jobs/create" className="inline-block mb-4">
                <Button>Add New Job</Button>
            </Link>
            <div className="flex flex-col sm:flex-row mb-3">
                <Filter
                    type="select"
                    options={statusOptions}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Filter by status"
                    className="w-full mb-2 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3"
                />
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3"
                />
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
                    <List
                        data={getPaginatedData(filteredJobs)}
                        columns={columns}
                        getCustomAction={handleComplete}
                        onDetails={handleDetails}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />
                </>
            )}
        </div>
    );
};

export default JobList;
