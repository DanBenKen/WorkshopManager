import React, { useState } from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

const Row = ({ data, columns, onEdit, onDelete, onDetails, customAction }) => {
    const [quantity, setQuantity] = useState(0);

    const isCustomActionValid = customAction && (customAction.requiresInput ? quantity > 0 : true);

    const handleCustomActionClick = () => {
        if (isCustomActionValid) {
            customAction.requiresInput ? customAction.onClick(quantity) : customAction.onClick();
            setQuantity(0);
        }
    };

    return (
        <TableRow>
            {columns.map((col, index) => (
                <TableCell key={`${data.id}-${index}`}>
                    {col.render ? col.render(data) : data[col.field]}
                </TableCell>
            ))}
            <TableCell className="flex flex-wrap gap-2 items-center justify-start">
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
                        className="p-2 border border-gray-300 rounded w-full md:w-auto"
                        placeholder="Quantity"
                    />
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
