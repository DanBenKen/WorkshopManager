import React, { useEffect, useState } from 'react';
import { FiUser, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import ButtonEdit from '../../atoms/ButtonEdit';
import ButtonCancel from '../../atoms/ButtonCancel';
import ButtonDelete from '../../atoms/ButtonDelete';
import useWorkers from '../../../hooks/useWorkers';
import ConfirmModal from '../../molecules/ConfirmModal';
import Modal from '../../molecules/Modal';
import { toast } from 'react-toastify';
import WorkerFormModal from './WorkerFormModal';

const WorkerDetailsModal = ({ workerId, onClose, refreshWorkers }) => {
    const { worker, error, handleDeleteWorker, fetchWorkerById } = useWorkers();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showWorkerForm, setShowWorkerForm] = useState(false);

    const openWorkerForm = () => setShowWorkerForm(true);
    const closeWorkerForm = () => {
        setShowWorkerForm(false);
        fetchWorkerById(workerId);
    }

    useEffect(() => {
        if (workerId && !worker) {
            fetchWorkerById(workerId);
        }
    }, [fetchWorkerById, worker, workerId]);

    if (error) {
        return (
            <Modal onClose={onClose}>
                <div className="relative">
                    <ErrorMessage message={error} />
                </div>
            </Modal>
        );
    }

    if (!worker) {
        return (
            <Modal onClose={onClose}>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Modal>
        );
    }    

    const handleEdit = () => {
        openWorkerForm();
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const onConfirmDelete = async () => {
        setShowConfirm(false);
        try {
            await handleDeleteWorker(worker.id);
            refreshWorkers();
            toast.success(`Worker: ${worker.fullName} successfully deleted!`);
            onClose();
        } catch (error) {
            toast.error("Error deleting worker.");
        }
    };

    const onCancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <Modal onClose={onClose}>
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FiUser className="text-blue-500" />
                            {worker.fullName}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Details label="ID:" value={worker.id} />
                        <Details label="Position:" value={worker.position} />
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
            </Modal>

            {showWorkerForm && <WorkerFormModal workerId={workerId} onClose={closeWorkerForm} refreshWorkers={refreshWorkers} />}

            {showConfirm && (
                <ConfirmModal
                    message={`🗑️ Permanently delete worker ${worker.fullName}? This action can't be undone.`}
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                />
            )}
        </>
    );
};

export default WorkerDetailsModal;
