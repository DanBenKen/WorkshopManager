import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../../molecules/FormField';
import useSupplies from '../../../hooks/useSupplies';
import ErrorMessage from '../../atoms/ErrorMessage';
import Button from '../../atoms/Button';
import ButtonCancel from '../../atoms/ButtonCancel';
import useValidation from '../../../hooks/useValidation';
import { validateSupplyForm } from '../../../utils/validators';
import { SUPPLY_OPTIONS, SUPPLY_TYPE } from '../../../constants/supplyType';

const SupplyForm = () => {
    const { supplyId } = useParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    
    const isEditMode = !!supplyId;
    
    const { supply, fetchSupplyById, handleCreateSupply, handleUpdateSupply, isLoading, error } = useSupplies();
    const [formData, setFormData] = useState({ name: '', quantity: Number(0), type: SUPPLY_TYPE.MOTOROIL.apiValue });

    const { values, errors, handleChange, resetErrors, validateForm } = useValidation(formData, validateSupplyForm);

    useEffect(() => {
        if (isEditMode && !supply) {
            fetchSupplyById(supplyId);
        } else if (supply) {
            setFormData({ name: supply.name, quantity: Number(supply.quantity), type: supply.type });
        }
    }, [supplyId, isEditMode, supply, fetchSupplyById]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetErrors();
        if (!validateForm()) return;

        const success = isEditMode
            ? await handleUpdateSupply(supplyId, { ...values, quantity: Number(values.quantity) })
            : await handleCreateSupply({ ...values, quantity: Number(values.quantity) });

        if (success) {
            setSuccessMessage(isEditMode ? 'Supply updated successfully!' : 'Supply created successfully!');

            setTimeout(() => {
                navigate('/supplies');
            }, 2000);
        }
    };

    const handleBack = () => {
        if (isEditMode && supply) {
            navigate(`/supplies/details/${supply.id}`);
        } else {
            navigate('/supplies');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Supply' : 'Create New Supply'}</h2>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                    {successMessage}
                </div>
            )}

            {error && !Object.values(errors).some((e) => e) && <ErrorMessage message={error} />}

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
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : isEditMode ? 'Update Supply' : 'Create Supply'}
                </Button>
            </form>

            <ButtonCancel
                type="button"
                disabled={isLoading}
                onClick={handleBack}
                className="mt-2"
            >
                Go Back
            </ButtonCancel>
        </div>
    );
};

export default SupplyForm;
