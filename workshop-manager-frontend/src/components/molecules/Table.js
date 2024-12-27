import TableHeaderCell from "../atoms/TableHeaderCell";

const Table = ({ headers, children }) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <TableHeaderCell key={index}>{header}</TableHeaderCell>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </div>
);

export default Table;
