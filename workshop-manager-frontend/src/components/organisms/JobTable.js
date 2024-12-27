import Table from "../molecules/Table";
import JobRow from "../molecules/JobMolecules/JobRow";

const JobTable = ({ jobs, onEdit, onDelete }) => {
    const headers = ["Job Title", "Description", "Status", "Actions"];

    return (
        <Table headers={headers}>
            {jobs.length === 0 ? (
                <tr>
                    <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                        No jobs available
                    </td>
                </tr>
            ) : (
                jobs.map((job) => (
                    <JobRow
                        key={job.id}
                        job={job}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </Table>
    );
};

export default JobTable;
