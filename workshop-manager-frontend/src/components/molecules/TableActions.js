import React from 'react';
import Button from '../atoms/Button';

const TableActions = ({ onEdit, onDelete, onDetails, onCustomAction, customButtonLabel }) => {
    const buttonStyles = {
        details: "bg-green-500 hover:bg-green-600",
        edit: "bg-yellow-500 hover:bg-yellow-600",
        delete: "bg-red-500 hover:bg-red-600",
        custom: "bg-blue-500 hover:bg-blue-600",
    };

    return (
        <div className="flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-2">
            {onCustomAction && (
                <Button className={buttonStyles.custom} onClick={onCustomAction} type="button">
                    {customButtonLabel}
                </Button>
            )}
            <Button className={buttonStyles.details} onClick={onDetails} type="button">
                Details
            </Button>
            <Button className={buttonStyles.edit} onClick={onEdit} type="button">
                Edit
            </Button>
            <Button className={buttonStyles.delete} onClick={onDelete} type="button">
                Delete
            </Button>
        </div>
    );
};

export default TableActions;
