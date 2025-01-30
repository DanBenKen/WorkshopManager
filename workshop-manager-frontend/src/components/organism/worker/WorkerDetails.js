import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import Text from '../../atoms/Text';
import useWorkers from '../../../hooks/useWorkers';
import ButtonCancel from '../../atoms/ButtonCancel';
import DetailsButtons from '../../molecules/DetailsButtons';

const WorkerDetails = () => {
    const { workerId } = useParams();
    const { worker, isLoading, error } = useWorkers(workerId);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(`/workers`);
    };

    const handleEdit = (worker) => {
        navigate(`/workers/edit/${worker.id}`);
    };

    const handleDelete = (worker) => {
        navigate(`/workers/delete/${worker.id}`);
    };

    if (error) {
        return (
            <div className="mx-auto px-4 py-8">
                <ErrorMessage message={error} />
                <ButtonCancel className="mt-4" onClick={handleBack}>Back to List</ButtonCancel>
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

    return (
        <div className="mx-auto max-w-4xl px-6 py-8 bg-white rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Worker Details</h2>

            <div className="space-y-6">
                {worker && Object.entries(worker).map(([key, value]) => (
                    <Details key={key} label={key} value={value} />
                ))}
            </div>

            <DetailsButtons
                onBack={handleBack}
                onEdit={() => handleEdit(worker)}
                onDelete={() => handleDelete(worker)}
            />
        </div>
    );
};

export default WorkerDetails;
