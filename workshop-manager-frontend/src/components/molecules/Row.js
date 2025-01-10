import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';
import Button from '../atoms/Button';

const Row = ({ data, columns, onEdit, onDelete, onDetails, onCompleteJob, onAddMore }) => {
    const location = useLocation();
    const isSupplyPage = location.pathname.includes('supplies');
    const [quantity, setQuantity] = useState(0);

    const handleAddMore = () => {
        if (quantity > 0) {
            console.log('Adding more: ', quantity);
            onAddMore(data, quantity);
            setQuantity(0);
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
                />
                {isSupplyPage && (
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Quantity"
                        />
                        <Button onClick={handleAddMore}>Add Quantity</Button>
                    </div>
                )}
                {data.status !== 'Completed' && onCompleteJob && (
                    <Button
                        onClick={() => onCompleteJob(data)}
                    >
                        Complete Job
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default Row;
