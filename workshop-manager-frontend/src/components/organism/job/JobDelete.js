import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useJobs from '../../../hooks/useJobs';

const JobDelete = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteJob } = useJobs();

    const handleConfirm = async () => {
        await handleDeleteJob(jobId);
        navigate('/jobs');
    };

    const handleCancel = () => {
        navigate('/jobs');
    };

    return (
        <DeleteConfirmation
            itemName={`Job #${jobId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default JobDelete;
