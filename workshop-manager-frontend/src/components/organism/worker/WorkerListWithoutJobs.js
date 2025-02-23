import React, { useState, useMemo } from 'react';
import useWorkers from '../../../hooks/useWorkers';
import ErrorMessage from '../../atoms/ErrorMessage';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import ButtonCancel from '../../atoms/ButtonCancel';
import { useNavigate } from 'react-router-dom';

const WorkerListWithoutJobs = () => {
    const { workers, isLoading, error } = useWorkers(null, 'withoutJobs');
    const [nameFilter, setNameFilter] = useState('');
    const navigate = useNavigate();

    const filteredWorkers = useMemo(() => workers.filter((worker) =>
        nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true
    ), [workers, nameFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 5);

    const handleBack = () => {
        navigate(`/`);
    };

    if (isLoading) return <p className="text-gray-600 text-center">Loading...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="mx-auto mt-5 px-4 py-8 bg-white shadow-md rounded-lg max-w-screen-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Workers Without Jobs</h2>

            <div className="mb-4">
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className={"mb-4 w-2/4"}
                />
            </div>

            {filteredWorkers.length === 0 ? (
                <p className="mt-3 text-center text-gray-600">No results found</p>
            ) : (
                <div className="divide-y divide-gray-200">
                    {getPaginatedData(filteredWorkers).map((worker) => (
                        <div
                            key={`${worker.workerId}-${worker.fullName}`}
                            className="py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-4 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{worker.fullName}</h3>
                            <p className="text-sm text-gray-500 mt-2">No jobs assigned.</p>
                        </div>
                    ))}
                </div>
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

export default WorkerListWithoutJobs;
