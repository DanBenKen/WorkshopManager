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

    const handleEdit = (worker) => {
        navigate(`/workers/edit/${worker.id}`);
    };

    const handleDelete = (worker) => {
        navigate(`/workers/delete/${worker.id}`);
    };

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
            <Link to="/workers/create" className="inline-block mb-4">
                <Button>Add New Worker</Button>
            </Link>
            <Link to="/workers/with-jobs" className="inline-block ms-2 mb-4">
                <Button>Workers with Jobs</Button>
            </Link>

            <Filter
                type="input"
                value={nameFilter}
                onChange={setNameFilter}
                placeholder="Filter by name"
                className={"mb-4 w-2/3"}
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
                        onEdit={handleEdit}
                        onDelete={handleDelete}
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
