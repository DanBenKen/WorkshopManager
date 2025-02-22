import React from 'react';
import Table from '../atoms/Table';
import TableHeader from '../atoms/TableHeader';
import TableBody from '../atoms/TableBody';
import TableCell from '../atoms/TableCell';
import Row from './Row';

const List = ({ data, columns, onDetails, getCustomAction }) => {
    return (
        <div className="overflow-x-auto h-[500px] overflow-y-auto flex justify-center w-full">
            <Table className="w-full min-w-[800px] table-fixed border border-gray-300">
                <TableHeader>
                    {columns.map((col, index) => (
                        <TableCell key={index} className="text-sm font-semibold w-[500px]">
                            {col.label}
                        </TableCell>
                    ))}
                    <TableCell className="text-sm font-semibold w-[150px]">Actions</TableCell>
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
