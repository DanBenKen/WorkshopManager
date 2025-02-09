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
    const navigate = useNavigate();

    const filteredWorkers = workers.filter((worker) =>
        nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true
    );

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 5);

    const handleDetails = (worker) => {
        navigate(`/workers/details/${worker.id}`);
    };
    
    const columns = [
        { label: 'Full Name', field: 'fullName' },
        { label: 'Position', field: 'position' },
    ];

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Workers</h2>
            <div className="flex gap-2 mb-4">
                <Link to="/workers/create">
                    <Button>Add New Worker</Button>
                </Link>
                <Link to="/workers/with-jobs">
                    <Button>Workers with Jobs</Button>
                </Link>
                <Link to="/workers/without-jobs">
                    <Button>Workers without Jobs</Button>
                </Link>
            </div>

            <Filter
                type="input"
                value={nameFilter}
                onChange={setNameFilter}
                placeholder="Filter by name"
                className="mb-4 w-full sm:w-2/3 lg:w-1/3 xl:w-1/3"
            />

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default WorkersList;
