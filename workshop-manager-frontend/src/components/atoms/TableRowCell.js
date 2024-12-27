const TableRowCell = ({ children, className = '' }) => (
    <td className={`py-3 px-6 text-sm ${className}`}>{children}</td>
);

export default TableRowCell;
