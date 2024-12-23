namespace WorkshopManager.Exceptions.JobExceptions
{
    public class JobCreationNullException : Exception
    {
        public JobCreationNullException()
            : base($"Job creation failed.") { }
    }
}
