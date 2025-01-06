import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../atoms/ErrorMessage';
import Button from '../atoms/Button';
import useWorkers from '../../hooks/useWorkers';
import List from '../molecules/List';

const WorkersList = () => {
    const { workers, isLoading, error } = useWorkers();
    const navigate = useNavigate();

    const handleDelete = (worker) => {
        console.log(worker.id);
    };

    const handleEdit = (worker) => {
        navigate(`/workers/edit/${worker.id}`)
    };

    const columns = [
        { label: 'Full Name', field: 'fullName' },
        { label: 'Position', field: 'position' },
    ];

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Workers</h2>
            <Link to="/worker/create" className="inline-block mb-4">
                <Button>Add New Worker</Button>
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
                />
            )}
        </div>
    );
};

export default WorkersList;
