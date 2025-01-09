import React from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';
import Button from '../atoms/Button';

const Row = ({ data, columns, onEdit, onDelete, onDetails, onCompleteJob }) => {
    return (
        <TableRow>
            {columns.map((col, index) => (
                <TableCell key={`${data.id}-${index}`} className="px-4 py-2">
                    {col.render ? col.render(data) : data[col.field]}
                </TableCell>
            ))}
            <TableCell className="flex justify-end space-x-2">
                <TableActions
                    onEdit={() => onEdit(data)}
                    onDelete={() => onDelete(data)}
                    onDetails={() => onDetails(data)}
                />
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
