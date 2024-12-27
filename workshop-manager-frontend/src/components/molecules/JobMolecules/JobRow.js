import TableRowCell from "../../atoms/TableRowCell";

const JobRow = ({ job, onEdit, onDelete }) => (
    <tr className="hover:bg-gray-100 border-b">
        <TableRowCell className="text-gray-800">{job.jobName}</TableRowCell>
        <TableRowCell className="text-gray-600">{job.description}</TableRowCell>
        <TableRowCell className="text-gray-500">{job.status}</TableRowCell>
        <TableRowCell className="text-gray-800">{job.workerName || "N/A"}</TableRowCell>
        <TableRowCell>
            <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-2 py-1"
                onClick={() => onEdit(job.id)}
            >
                Edit
            </button>
            <span className="mx-2 text-gray-400">|</span>
            <button
                className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md px-2 py-1"
                onClick={() => onDelete(job.id)}
            >
                Delete
            </button>
        </TableRowCell>
    </tr>
);

export default JobRow;
