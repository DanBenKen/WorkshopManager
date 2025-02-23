import React, { useState, useMemo } from 'react';
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

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesName = nameFilter ? job.jobName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            const matchesStatus = statusFilter ? job.status.toLowerCase() === statusFilter.toLowerCase() : true;
            return matchesName && matchesStatus;
        });
    }, [jobs, nameFilter, statusFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredJobs, 5);

    const paginatedData = useMemo(() => getPaginatedData(filteredJobs), [getPaginatedData, filteredJobs]);

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

    const statusOptions = () => [
        { label: 'In Progress', value: 'InProgress' },
        { label: 'Completed', value: 'Completed' },
    ];

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Jobs</h2>

            <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 mb-4">
                <Link to="/jobs/create">
                    <Button className="w-full md:w-auto">Add New Job</Button>
                </Link>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Filter
                        type="input"
                        value={nameFilter}
                        onChange={setNameFilter}
                        placeholder="Filter by name"
                        className="w-full sm:w-1/3"
                    />
                    <Filter
                        type="select"
                        options={statusOptions}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        placeholder="Filter by status"
                        className="w-full sm:w-1/3"
                    />
                </div>
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : filteredJobs.length === 0 ? (
                <p className="mt-3 text-gray-600 text-center">No results found</p>
            ) : (
                <div className="overflow-x-auto">
                    <List
                        data={paginatedData}
                        columns={columns}
                        getCustomAction={handleComplete}
                        onDetails={handleDetails}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={goToPage}
                    />
                </div>
            )}
        </div>
    );
};

export default JobList;
