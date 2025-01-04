import React from 'react';
import useWorkers from '../hooks/useWorkers';
import ErrorMessage from '../components/atoms/ErrorMessage';

const Workers = () => {
    const { workers, isLoading, error } = useWorkers();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Workers</h2>
            <button className="btn btn-primary mb-4">Add New Worker</button>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Full Name</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map(worker => (
                            <tr key={worker.id}>
                                <td className="border p-2">{worker.fullName}</td>
                                <td className="border p-2">{worker.position}</td>
                                <td className="border p-2">
                                    <button className="btn btn-secondary mr-2">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Workers;
