import React, { useState } from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

const Row = ({ data, columns, onDetails, customAction }) => {
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
            <TableCell className="p-2">
                <TableActions
                    onDetails={() => onDetails(data)}
                    onCustomAction={customAction ? handleCustomActionClick : null}
                    customButtonLabel={customAction?.label}
                />
                {customAction?.requiresInput && (
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border border-gray-300 p-1 rounded w-full md:w-auto"
                        placeholder="Quantity"
                    />
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
