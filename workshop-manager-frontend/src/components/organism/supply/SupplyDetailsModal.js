import React, { useState, useEffect } from 'react';
import { FiArchive, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import ErrorMessage from '../../atoms/ErrorMessage';
import Details from '../../molecules/Details';
import ButtonEdit from '../../atoms/ButtonEdit';
import ButtonCancel from '../../atoms/ButtonCancel';
import ButtonDelete from '../../atoms/ButtonDelete';
import useSupplies from '../../../hooks/useSupplies';
import ConfirmModal from '../../molecules/ConfirmModal';
import Modal from '../../molecules/Modal';
import { toast } from 'react-toastify';
import SupplyFormModal from './SupplyFormModal';

const SupplyDetailsModal = ({ supplyId, onClose, refreshSupplies }) => {
    const { supply, error, fetchSupplyById, handleDeleteSupply } = useSupplies();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSupplyForm, setShowSupplyForm] = useState(false);

    useEffect(() => {
        if (supplyId && !supply) {
            fetchSupplyById(supplyId);
        }
    }, [supplyId, supply, fetchSupplyById]);

    const openSupplyForm = () => setShowSupplyForm(true);
    const closeSupplyForm = () => {
        setShowSupplyForm(false);
        fetchSupplyById(supplyId);
    }

    if (error) {
        return (
            <Modal onClose={onClose}>
                <div className="relative">
                    <ErrorMessage message={error} />
                </div>
            </Modal>
        );
    }

    if (!supply) {
        return (
            <Modal onClose={onClose}>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Modal>
        );
    }

    const handleEdit = () => {
        openSupplyForm();
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const onConfirmDelete = async () => {
        setShowConfirm(false);
        try {
            await handleDeleteSupply(supply.id);
            refreshSupplies();
            toast.success(`Supply: #${supply.id} successfully deleted!`);
            onClose();
        } catch (err) {
            toast.error("Error deleting supply.");
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
                            <FiArchive className="text-blue-500" />
                            {supply.name}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Details label="Supply ID:" value={supply.id} />
                        <Details label="Name:" value={supply.name} />
                        <Details label="Quantity:" value={supply.quantity} />
                        <Details label="Type:" value={supply.type} />
                    </div>

                    <div className="mt-6 flex gap-3 justify-end">
                        <ButtonCancel onClick={onClose}>
                            <FiX className="w-7 h-7" />
                        </ButtonCancel>
                        <ButtonEdit onClick={handleEdit}>
                            <FiEdit className="w-7 h-7" />
                        </ButtonEdit>
                        <ButtonDelete onClick={handleDelete}>
                            <FiTrash2 className="w-7 h-7" />
                        </ButtonDelete>
                    </div>
                </div>
            </Modal>

            {showSupplyForm && (
                <SupplyFormModal
                    supplyId={supplyId}
                    onClose={closeSupplyForm}
                    refreshSupplies={refreshSupplies}
                />
            )}

            {showConfirm && (
                <ConfirmModal
                    message={`🗑️ Permanently delete supply ${supply.id}? This action can't be undone.`}
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                />
            )}
        </>
    );
};

export default SupplyDetailsModal;
