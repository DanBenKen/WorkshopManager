import React from 'react';
import Button from '../atoms/Button';

const DeleteConfirmation = ({ itemName, onConfirm, onCancel }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p>{`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}</p>
            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={onCancel} className="bg-gray-500 hover:bg-gray-400">Cancel</Button>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
