import Table from "../molecules/Table";
import JobRow from "../molecules/JobMolecules/JobRow";

const JobTable = ({ jobs, onRefresh }) => {
    const headers = ["Job Title", "Description", "Status", "Worker", "Actions"];

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
                        onDelete={onRefresh}
                        onUpdate={onRefresh}
                    />
                ))
            )}
        </Table>
    );
};

export default JobTable;
