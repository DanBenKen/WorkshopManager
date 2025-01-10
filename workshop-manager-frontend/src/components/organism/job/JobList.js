import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useJobs from '../../../hooks/useJobs';
import List from '../../molecules/List';

const JobList = () => {
    const { jobs, isLoading, error, handleSetCompleted } = useJobs();
    const navigate = useNavigate();

    const handleEdit = (job) => {
        navigate(`/jobs/edit/${job.id}`);
    };

    const handleDelete = (job) => {
        navigate(`/jobs/delete/${job.id}`);
    };

    const handleDetails = (job) => {
        navigate(`/jobs/details/${job.id}`);
    };

    const handleComplete = (job) => {
        if (job.status !== 'Completed') {
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

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">Jobs</h2>
            <Link to="/jobs/create" className="inline-block mb-4">
                <Button>Add New Job</Button>
            </Link>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <List
                    data={jobs}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDetails={handleDetails}
                    getCustomAction={handleComplete}
                />
            )}
        </div>
    );
};

export default JobList;
