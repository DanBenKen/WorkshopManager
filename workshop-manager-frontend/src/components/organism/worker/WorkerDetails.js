import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import useWorkers from '../../../hooks/useWorkers';

const WorkerDetails = () => {
    const { workerId } = useParams();
    const { workers, isLoading, error } = useWorkers(workerId);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/workers`);
    };

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

    if (!workers || workers.length === 0) {
        return (
            <div className="mx-auto px-4 py-8">
                <Text content="No details found." />
                <Button className="mt-4" onClick={handleBack}>Back to List</Button>
            </div>
        );
    }

    const worker = workers[0];

    return (
        <div className="mx-auto max-w-4xl px-6 py-8 bg-white rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Worker Details</h2>

            <div className="space-y-6">
                {Object.entries(worker).map(([key, value]) => (
                    <Details key={key} label={key} value={value} />
                ))}
            </div>

            <div className="mt-6">
                <Button
                    className="mt-4"
                    onClick={handleBack}>
                    Back to List
                </Button>
            </div>
        </div>
    );
};

export default WorkerDetails;
