namespace WorkshopManager.Exceptions.WorkerExceptions
{
    public class WorkerCreateNullException : Exception
    {
        public WorkerCreateNullException()
            : base($"Worker create fail.") { }
    }
}
