import React, { useState } from 'react';
import { FiActivity, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import ButtonEdit from '../../atoms/ButtonEdit';
import ButtonCancel from '../../atoms/ButtonCancel';
import ButtonDelete from '../../atoms/ButtonDelete';
import useJobs from '../../../hooks/useJobs';
import ConfirmModal from '../../molecules/ConfirmModal';
import Modal from '../../molecules/Modal';
import { toast } from 'react-toastify';
import JobFormModal from './JobFormModal';
import { JOB_STATUSES } from '../../../constants/jobStatus';

const JobDetailsModal = ({ jobId, onClose, refreshJobs }) => {
    const { job, error, handleDeleteJob } = useJobs(jobId);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showJobForm, setShowJobForm] = useState(false);

    const openJobForm = () => setShowJobForm(true);
    const closeJobForm = () => setShowJobForm(false);

    const getIconColor = (status) => {
        if (status === JOB_STATUSES.COMPLETED.apiValue) {
            return 'text-green-500';
        }
        if (status === JOB_STATUSES.IN_PROGRESS.apiValue) {
            return 'text-yellow-500';
        }
        return 'text-gray-400';
    };

    if (error) {
        return (
            <Modal onClose={onClose}>
                <div className="relative">
                    <ErrorMessage message={error} />
                </div>
            </Modal>
        );
    }

    if (!job) {
        return null;
    }

    const handleEdit = () => {
        openJobForm();
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const onConfirmDelete = async () => {
        setShowConfirm(false);
        try {
            await handleDeleteJob(job.id);
            refreshJobs();
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
            <Modal onClose={handleClose}>
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FiActivity className={`${getIconColor(job.status)}`} />
                            {job.jobName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Details label="Job ID:" value={job.id} />
                        <Details label="Status:" value={job.status} />
                        <Details label="Supply ID:" value={job.supplyId} />
                        <Details label="Supply Quantity:" value={job.supplyQuantity} />
                        <div className="col-span-2">
                            <Details label="Description:" value={job.description} />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-3 justify-end">
                        <ButtonCancel onClick={handleClose}>
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
            </Modal>

            {showJobForm && <JobFormModal jobId={jobId} onClose={closeJobForm} refreshJobs={refreshJobs} />}

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
