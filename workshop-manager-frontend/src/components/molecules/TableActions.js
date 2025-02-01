import React from 'react';
import Button from '../atoms/Button';

const TableActions = ({ onDetails, onCustomAction, customButtonLabel }) => {
    const buttonStyles = {
        details: "bg-green-500 hover:bg-green-600",
        custom: "bg-blue-500 hover:bg-blue-600",
    };

    return (
        <div className="flex flex-col xl:flex-row space-y-2 xl:space-y-0 xl:space-x-2">
            <Button className={buttonStyles.details} onClick={onDetails} type="button">
                Details
            </Button>
            {onCustomAction && (
                <Button className={buttonStyles.custom} onClick={onCustomAction} type="button">
                    {customButtonLabel}
                </Button>
            )}
        </div>
    );
};

export default TableActions;
