import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import useJobs from '../../../hooks/useJobs';
import DetailsButtons from '../../molecules/DetailsButtons';

const JobDetails = () => {
    const { jobId } = useParams();
    const { job, isLoading, error } = useJobs(jobId);
    const navigate = useNavigate();

    const handleBack = useCallback(() => {
        navigate(`/jobs`);
    }, [navigate]);

    const handleEdit = useCallback((job) => {
        navigate(`/jobs/edit/${job.id}`);
    }, [navigate]);

    const handleDelete = useCallback((job) => {
        navigate(`/jobs/delete/${job.id}`);
    }, [navigate]);

    if (error) {
        return (
            <div className="mx-auto px-4 py-8">
                <ErrorMessage message={error} />
                <Button className="mt-4" onClick={handleBack}>Back to List</Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto px-4 py-8">
                <Text content="Loading..." />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="mx-auto px-4 py-8">
                <Text content="No details found." />
                <Button className="mt-4" onClick={handleBack}>Back to List</Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-8 bg-white rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Job Details</h2>

            <div className="space-y-6">
                {Object.entries(job).map(([key, value]) => (
                    <Details key={key} label={key} value={value} />
                ))}
            </div>

            <DetailsButtons
                onBack={handleBack}
                onEdit={() => handleEdit(job)}
                onDelete={() => handleDelete(job)}
            />
        </div>
    );
};

export default JobDetails;
