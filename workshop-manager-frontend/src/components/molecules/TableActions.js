import React from 'react';
import Button from '../atoms/Button';

const TableActions = ({ onEdit, onDelete, onDetails }) => {
    return (
        <div>
            <Button
                className="bg-green-500 hover:bg-green-600 mr-2"
                onClick={onDetails}
                type="button">
                Details
            </Button>
            <Button
                className="bg-yellow-500 hover:bg-yellow-600 mr-2"
                onClick={onEdit}
                type="button"
            >
                Edit
            </Button>
            <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={onDelete}
                type="button"
            >
                Delete
            </Button>
        </div>
    );
};

export default TableActions;
