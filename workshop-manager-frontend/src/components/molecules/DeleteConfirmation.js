import React from 'react';
import Text from '../atoms/Text';
import ButtonCancel from '../atoms/ButtonCancel';
import ButtonDelete from '../atoms/ButtonDelete';

const DeleteConfirmation = ({ itemName, onConfirm, onCancel }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <Text content={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}></Text>
            <div className="flex justify-end space-x-4 mt-6">
                <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
                <ButtonDelete onClick={onConfirm}>Delete</ButtonDelete>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
