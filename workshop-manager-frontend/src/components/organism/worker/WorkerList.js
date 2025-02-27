import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useWorkers from '../../../hooks/useWorkers';
import List from '../../molecules/List';
import usePagination from '../../../hooks/usePagination';
import Pagination from '../../molecules/Pagination';
import Filter from '../../molecules/Filter';
import { POSITION_OPTIONS } from '../../../constants/workerPosition';

const WorkersList = () => {
    const { workers, isLoading, error } = useWorkers('all');
    const [nameFilter, setNameFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const navigate = useNavigate();

    const filteredWorkers = useMemo(() => workers.filter((worker) => {
        const matchesName = nameFilter ? worker.fullName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesPosition = positionFilter ? worker.position.includes(positionFilter) : true;
        return matchesName && matchesPosition;
    }), [workers, nameFilter, positionFilter]);

    const { currentPage, totalPages, goToPage, getPaginatedData } = usePagination(filteredWorkers, 5);

    const handleDetails = (worker) => {
        navigate(`/workers/details/${worker.id}`);
    };

    const columns = [
        { label: 'ID', field: 'id' },
        { label: 'Full Name', field: 'fullName' },
        { label: 'Position', field: 'position' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Workers</h2>

            <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 mb-4">
                <Button className="w-full md:w-auto" onClick={() => navigate('/workers/create')}>
                    Add New Worker
                </Button>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Button className="w-full md:w-auto" onClick={() => navigate('/workers/with-jobs')}>
                        Workers With Jobs
                    </Button>
                    <Button className="w-full md:w-auto" onClick={() => navigate('/workers/without-jobs')}>
                        Workers Without Jobs
                    </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <Filter
                    type="select"
                    value={positionFilter}
                    onChange={setPositionFilter}
                    defaultOptionLabel="Position"
                    options={POSITION_OPTIONS}
                    className="w-full sm:w-auto"
                />
                <Filter
                    type="input"
                    value={nameFilter}
                    onChange={setNameFilter}
                    placeholder="Filter by name"
                    className="w-full sm:w-auto"
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
