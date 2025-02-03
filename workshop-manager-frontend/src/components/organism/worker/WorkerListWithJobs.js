import React, { useState } from 'react';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';

const WorkerListWithJobs = () => {
    const { workers, isLoading, error } = useWorkers(null, 'withJobs');
    const [nameFilter, setNameFilter] = useState('');

    const filteredWorkers = workers.filter((worker) =>
        nameFilter ? worker.workerName.toLowerCase().includes(nameFilter.toLowerCase()) : true
    );

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 5);

    if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="mx-auto mt-5 px-4 py-8 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Workers and Their Jobs</h2>

            <div className="mb-4">
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className={"mb-4 w-2/4"}
                />
            </div>

            <div className="divide-y divide-gray-200">
                {getPaginatedData(filteredWorkers).map((worker) => (
                    <div
                        key={worker.workerId}
                        className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">{worker.workerName}</h3>
                        {worker.jobs.length > 0 ? (
                            <ul className="list-disc list-inside mt-2 text-gray-700">
                                {worker.jobs.map((job) => (
                                    <li key={job.id}>
                                        <span className="font-medium">{job.jobName}</span> -{' '}
                                        <span className="italic">{job.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 mt-2">No jobs assigned.</p>
                        )}
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
        </div>
    );
};

export default WorkerListWithJobs;
