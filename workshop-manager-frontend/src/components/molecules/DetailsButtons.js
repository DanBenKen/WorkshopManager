import React from 'react';
import ButtonCancel from '../atoms/ButtonCancel';
import ButtonEdit from '../atoms/ButtonEdit';
import ButtonDelete from '../atoms/ButtonDelete';

const DetailsButtons = ({ onBack, onEdit, onDelete }) => {
    return (
        <div className="mt-6">
            <ButtonCancel onClick={onBack} className="me-2">Back to List</ButtonCancel>
            <ButtonEdit onClick={onEdit} className="bg-gray-500 hover:bg-gray-400 me-2">Edit</ButtonEdit>
            <ButtonDelete onClick={onDelete} className="bg-red-500 hover:bg-red-600">Delete</ButtonDelete>
        </div>
    );
};

export default DetailsButtons;
