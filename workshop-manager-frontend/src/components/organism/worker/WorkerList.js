import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useWorkers from '../../../hooks/useWorkers';
import List from '../../molecules/List';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';

const WorkersList = () => {
    const { workers, isLoading, error } = useWorkers(null, 'all');
    const [nameFilter, setNameFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const navigate = useNavigate();

    const filteredWorkers = workers.filter((worker) => {
        const matchesName = nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesPosition = positionFilter ? worker.position.toLowerCase().includes(positionFilter.toLowerCase()) : true;
        return matchesName && matchesPosition;
    });

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 5);

    const handleDetails = (worker) => {
        navigate(`/workers/details/${worker.id}`);
    };

    const columns = [
        { label: 'Full Name', field: 'fullName' },
        { label: 'Position', field: 'position' },
    ];

    return (
        <div className="max-w-[1000px] mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Workers</h2>

            <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 mb-4">
                <Link to="/workers/create">
                    <Button className="w-full md:w-auto">Add New Worker</Button>
                </Link>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Link to="/workers/with-jobs">
                        <Button className="w-full md:w-auto">Workers With Jobs</Button>
                    </Link>
                    <Link to="/workers/without-jobs">
                        <Button className="w-full md:w-auto">Workers Without Jobs</Button>
                    </Link>
                </div>
            </div>

            <div className="flex gap-4 mb-3">
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className="w-full sm:w-1/3"
                />
                <Filter
                    type="input"
                    value={positionFilter}
                    onChange={setPositionFilter}
                    placeholder="Filter by position"
                    className="w-full sm:w-1/3"
                />
            </div>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : filteredWorkers.length === 0 ? (
                <p className="mt-3 text-gray-600 text-center">No results found</p>
            ) : (
                <div className="overflow-x-auto">
                    <List
                        data={getPaginatedData(filteredWorkers)}
                        columns={columns}
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

export default WorkersList;
