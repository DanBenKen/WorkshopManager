import React from 'react';
import TableRow from '../atoms/TableRow';
import TableCell from '../atoms/TableCell';
import TableActions from './TableActions';

const Row = ({ data, columns, onEdit, onDelete }) => {
    return (
        <TableRow key={data.id}>
            {columns.map((col) => (
                <TableCell key={col} className="px-4 py-2">{data[col]}</TableCell>
            ))}
            <TableCell className="flex justify-end space-x-2">
                <TableActions 
                    onEdit={() => onEdit(data)} 
                    onDelete={() => onDelete(data.id)}/>
            </TableCell>
        </TableRow>
    );
};

export default Row;
