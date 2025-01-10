import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

const Row = ({ data, columns, onEdit, onDelete, onDetails, onCompleteJob, onAddMore }) => {
    const location = useLocation();
    const isSupplyPage = location.pathname.includes('supplies');
    const [quantity, setQuantity] = useState(0);

    // Custom action to handle quantity increase
    const handleIncreaseQuantity = () => {
        if (quantity > 0) {
            onAddMore(data, quantity);
            setQuantity(0);
        }
    };

    const isActionAvailable = isSupplyPage || (data.status !== 'Completed' && onCompleteJob);
    const customAction = isSupplyPage ? handleIncreaseQuantity : (data.status !== 'Completed' ? () => onCompleteJob(data) : null);
    const buttonLabel = isSupplyPage ? 'Add Quantity' : (data.status !== 'Completed' ? 'Complete Job' : null);

    return (
        <TableRow>
            {columns.map((col, index) => (
                <TableCell key={`${data.id}-${index}`} className="px-4 py-2">
                    {col.render ? col.render(data) : data[col.field]}
                </TableCell>
            ))}
            <TableCell className="flex space-x-2">
                <TableActions
                    onEdit={() => onEdit(data)}
                    onDelete={() => onDelete(data)}
                    onDetails={() => onDetails(data)}
                    onCustomAction={customAction}
                    customButtonLabel={buttonLabel}
                />
                {isActionAvailable && (
                    <div className="flex items-center space-x-2">
                        {isSupplyPage && (
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="p-2 border border-gray-300 rounded"
                                placeholder="Quantity"
                            />
                        )}
                    </div>
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
