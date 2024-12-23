namespace WorkshopManager.Exceptions.JobExceptions
{
    public class JobUpdateNullException : Exception
    {
        public JobUpdateNullException()
            : base($"Job update failed.") { }
    }
}
