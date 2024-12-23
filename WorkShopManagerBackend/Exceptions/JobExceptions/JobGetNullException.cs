namespace WorkshopManager.Exceptions.JobExceptions
{
    public class JobGetNullException : Exception
    {
        public JobGetNullException()
            : base($"Getting job failed.") { }
    }
}
