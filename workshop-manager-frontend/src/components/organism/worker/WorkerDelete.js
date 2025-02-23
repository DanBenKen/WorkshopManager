import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useWorkers from '../../../hooks/useWorkers';

const WorkerDelete = () => {
    const { workerId } = useParams();
    const navigate = useNavigate();
    const { worker, handleDeleteWorker } = useWorkers(workerId);

    const handleConfirm = useCallback(async () => {
        if (worker) {
            await handleDeleteWorker(worker.id);
            navigate('/workers');
        }
    }, [worker, handleDeleteWorker, navigate]);

    const handleCancel = useCallback(() => {
        if (worker) {
            navigate(`/workers/details/${worker.id}`);
        }
    }, [worker, navigate]);

    return (
        <DeleteConfirmation
            itemName={`Worker #${workerId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default WorkerDelete;
