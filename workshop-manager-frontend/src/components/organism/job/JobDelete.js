import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../molecules/DeleteConfirmation';
import useJobs from '../../../hooks/useJobs';

const JobDelete = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { handleDeleteJob } = useJobs();

    const handleConfirm = useCallback(async () => {
        await handleDeleteJob(jobId);
        navigate('/jobs');
    }, [handleDeleteJob, jobId, navigate]);

    const handleCancel = useCallback(() => {
        navigate(`/jobs/details/${jobId}`);
    }, [navigate, jobId]);

    return (
        <DeleteConfirmation
            itemName={`Job #${jobId}`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );
};

export default JobDelete;
