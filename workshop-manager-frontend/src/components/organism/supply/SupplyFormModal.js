import React, { useState, useEffect, useCallback } from 'react';
import { validateSupplyForm } from '../../../utils/validators';
import FormField from '../../molecules/FormField';
import useSupplies from '../../../hooks/useSupplies';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import useValidation from '../../../hooks/useValidation';
import Modal from '../../molecules/Modal';
import { SUPPLY_OPTIONS, SUPPLY_TYPE } from '../../../constants/supplyType';
import { toast } from 'react-toastify';
import ButtonCancel from '../../atoms/ButtonCancel';
import { FiX, FiRefreshCcw } from 'react-icons/fi';

const initialFormState = {
    name: '',
    quantity: 0,
    type: SUPPLY_TYPE.MOTOROIL.apiValue
};

const SupplyFormModal = ({ supplyId, onClose, refreshSupplies }) => {
    const { supply, fetchSupplyById, handleCreateSupply, handleUpdateSupply, error, clearError } = useSupplies();
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const isEditMode = !!supplyId;

    const { values, errors, handleChange, resetErrors, validateForm, resetValues } = useValidation(formData, validateSupplyForm);

    useEffect(() => {
        if (isEditMode && !supply) {
            fetchSupplyById(supplyId);
        } else if (supply) {
            setFormData({
                name: supply.name,
                quantity: Number(supply.quantity),
                type: supply.type
            });
        }
    }, [supplyId, isEditMode, supply, fetchSupplyById, setFormData]);

    const resetForm = useCallback(() => {
        if (isEditMode && supply) {
            resetValues({
                name: supply.name,
                quantity: Number(supply.quantity),
                type: supply.type
            });
        } else {
            resetValues({ ...initialFormState });
        }
        resetErrors();
        clearError();
    }, [isEditMode, supply, resetValues, resetErrors, clearError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        if (!validateForm()) return;

        setIsButtonLoading(true);

        const success = isEditMode
            ? await handleUpdateSupply(supplyId, { ...values, quantity: Number(values.quantity) })
            : await handleCreateSupply({ ...values, quantity: Number(values.quantity) });

        if (success) {
            toast.success(isEditMode ? `Supply: ${values.name} updated successfully!` : 'Supply created successfully!');
            await refreshSupplies();
            onClose();
        } else {
            setIsButtonLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div>
                <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Supply' : 'Create New Supply'}</h2>

                {error && !Object.values(errors).some(e => e) && <ErrorMessage message={error} />}

                <form onSubmit={handleSubmit}>
                    <FormField
                        label="Name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Enter supply name"
                        errorMessage={errors.name}
                    />
                    <FormField
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        errorMessage={errors.quantity}
                    />
                    <FormField
                        label="Type"
                        type="select"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        options={SUPPLY_OPTIONS}
                        errorMessage={errors.type}
                    />
                    <div className="mt-6 flex gap-3">
                        <ButtonCancel type="button" onClick={onClose}>
                            <FiX className="w-7 h-7" />
                        </ButtonCancel>
                        <Button type="button" onClick={resetForm}>
                            <FiRefreshCcw className="w-6 h-6" />
                        </Button>
                        <Button type="submit" disabled={isButtonLoading}>
                            {isButtonLoading
                                ? (isEditMode ? 'Updating...' : 'Creating...')
                                : (isEditMode ? 'Update Supply' : 'Create Supply')}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default SupplyFormModal;
