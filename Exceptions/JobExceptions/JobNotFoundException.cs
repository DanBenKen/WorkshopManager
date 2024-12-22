namespace WorkshopManager.Exceptions.JobExceptions
{
    public class JobNotFoundException : Exception
    {
        public JobNotFoundException(int jobId)
            : base($"Job with ID {jobId} not found.") { }
    }
}
