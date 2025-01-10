import React, { useState } from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

const Row = ({ data, columns, onEdit, onDelete, onDetails, customAction }) => {
    const [quantity, setQuantity] = useState(0);

    const handleCustomActionClick = () => {
        if (customAction?.requiresInput && quantity > 0) {
            customAction.onClick(quantity);
            setQuantity(0);
        } else if (customAction) {
            customAction.onClick();
        }
    };

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
                    onCustomAction={customAction ? handleCustomActionClick : null}
                    customButtonLabel={customAction?.label}
                />
                {customAction?.requiresInput && (
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="p-2 border border-gray-300 rounded"
                        placeholder="Quantity"
                    />
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
