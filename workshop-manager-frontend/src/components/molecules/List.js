import React from 'react';
import Table from '../atoms/Table';
import TableHeader from '../atoms/TableHeader';
import TableBody from '../atoms/TableBody';
import TableCell from '../atoms/TableCell';
import Row from './Row';

const List = ({ data, columns, onDetails, getCustomAction }) => {
    return (
        <div className="overflow-x-auto flex justify-center">
            <Table className="min-w-full">
                <TableHeader>
                    {columns.map((col, index) => (
                        <TableCell key={index} className="text-sm md:text-base font-semibold">
                            {col.label}
                        </TableCell>
                    ))}
                    <TableCell className="text-sm lg:text-base font-semibold">Actions</TableCell>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <Row
                            key={item.id}
                            data={item}
                            columns={columns}
                            onDetails={onDetails}
                            customAction={getCustomAction ? getCustomAction(item) : null}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default List;
