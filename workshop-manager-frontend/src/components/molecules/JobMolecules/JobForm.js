import InputField from '../../atoms/InputField';
import TextArea from '../../atoms/TextArea';
import SelectField from '../../atoms/SelectField';
import Button from '../../atoms/Button';

const JobForm = ({ job, onChange, onSubmit, loading }) => (
    <form onSubmit={onSubmit}>
        <InputField
            label="Job Title"
            name="jobName"
            value={job.jobName}
            onChange={onChange}
            placeholder="Enter job title"
            required
        />
        <TextArea
            label="Job Description"
            name="description"
            value={job.description}
            onChange={onChange}
            placeholder="Enter job description"
            required
        />
        <InputField
            label="Worker ID"
            name="workerId"
            type="number"
            value={job.workerId}
            onChange={onChange}
            placeholder="Enter worker ID"
            required
        />
        <InputField
            label="Supply ID"
            name="supplyId"
            type="number"
            value={job.supplyId}
            onChange={onChange}
            placeholder="Enter supply ID"
            required
        />
        <SelectField
            label="Job Status"
            name="status"
            value={job.status}
            onChange={onChange}
            options={[
                { value: 0, label: 'Not Started' },
                { value: 1, label: 'In Progress' },
                { value: 2, label: 'Completed' },
                { value: 3, label: 'Cancelled' },
            ]}
        />
        <Button type="submit" label="Create Job" disabled={loading} />
    </form>
);

export default JobForm;
