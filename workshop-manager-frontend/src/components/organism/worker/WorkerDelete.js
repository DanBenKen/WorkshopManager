import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useWorkers from '../../../hooks/useWorkers';

const WorkerDelete = () => {
    const { workerId } = useParams();
    const navigate = useNavigate();
    const { worker, handleDeleteWorker } = useWorkers(workerId);

    const handleConfirm = async (worker) => {
        await handleDeleteWorker(worker.id);
        navigate('/workers');
    };

    const handleCancel = (worker) => {
        navigate(`/workers/details/${worker.id}`);
    };

    return (
        <DeleteConfirmation
            itemName={`Worker #${workerId}`}
            onConfirm={() => handleConfirm(worker)}
            onCancel={() => handleCancel(worker)}
        />
    );
};

export default WorkerDelete;
