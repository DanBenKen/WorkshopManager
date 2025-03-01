import React, { useState } from 'react';
import { FiActivity, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import ButtonEdit from '../../atoms/ButtonEdit';
import ButtonCancel from '../../atoms/ButtonCancel';
import ButtonDelete from '../../atoms/ButtonDelete';
import useJobs from '../../../hooks/useJobs';
import ConfirmModal from '../../molecules/ConfirmModal';
import { toast } from 'react-toastify';

const JobDetailsModal = ({ jobId, onClose, refreshJobs }) => {
    const { job, error, handleDeleteJob } = useJobs(jobId);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
                    <ErrorMessage message={error} />
                    <button className="absolute top-4 right-4" onClick={onClose}>
                        <FiX className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
            </div>
        );
    }

    if (!job) {
        return null;
    }

    const handleEdit = () => {
        navigate(`/jobs/edit/${job.id}`);
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const onConfirmDelete = async () => {
        setShowConfirm(false);
        try {
            await handleDeleteJob(job.id);
            await refreshJobs();
            toast.success(`Job: #${job.id} successfully deleted!`);
            onClose();
        } catch (error) {
            toast.error("Error deleting job.");
        }
    };

    const onCancelDelete = () => {
        setShowConfirm(false);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-4 right-4" onClick={handleClose}>
                        <FiX className="w-6 h-6 text-gray-500" />
                    </button>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FiActivity className="w-8 h-8 text-yellow-500" />
                            {job.jobName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Details label="Job ID:" value={job.id} />
                        <Details label="Status:" value={job.status} />
                        <div className="md:col-span-2">
                            <Details label="Description:" value={job.description} />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 justify-end">
                        <ButtonCancel onClick={onClose}>
                            <FiX className="w-7 h-7" />
                        </ButtonCancel>
                        <ButtonEdit onClick={handleEdit}>
                            <FiEdit className="w-7 h-7" />
                        </ButtonEdit>
                        <ButtonDelete onClick={handleDelete} variant="danger">
                            <FiTrash2 className="w-7 h-7" />
                        </ButtonDelete>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <ConfirmModal
                    message={`🗑️ Permanently delete job ${job.id}? This action can't be undone.`}
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                />
            )}
        </>
    );
};

export default JobDetailsModal;
