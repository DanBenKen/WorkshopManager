import React from 'react';
import Table from '../atoms/Table';
import TableHeader from '../atoms/TableHeader';
import TableBody from '../atoms/TableBody';
import TableCell from '../atoms/TableCell';
import Row from './Row';

const List = ({ data, columns, onEdit, onDelete, onDetails, getCustomAction }) => {
    return (
        <Table>
            <TableHeader>
                {columns.map((col, index) => (
                    <TableCell key={index}>{col.label}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
            </TableHeader>
            <TableBody>
                {data.map((item) => {
                    const customAction = getCustomAction ? getCustomAction(item) : null;

                    return (
                        <Row
                            key={item.id}
                            data={item}
                            columns={columns}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onDetails={onDetails}
                            customAction={customAction}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default List;
