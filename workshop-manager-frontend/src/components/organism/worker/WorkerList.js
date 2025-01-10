import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useWorkers from '../../../hooks/useWorkers';
import List from '../../molecules/List';

const WorkersList = () => {
    const { workers, isLoading, error } = useWorkers(null, 'all');
    const navigate = useNavigate();

    const handleEdit = (worker) => {
        navigate(`/workers/edit/${worker.id}`)
    };

    const handleDelete = (worker) => {
        navigate(`/workers/delete/${worker.id}`)
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

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <List
                    data={workers}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetails={handleDetails}
                />
            )}
        </div>
    );
};

export default WorkersList;
