namespace WorkshopManager.Exceptions.WorkerExceptions
{
    public class WorkerUpdateNullException : Exception
    {
        public WorkerUpdateNullException()
            : base($"Supply update failed.") { }
    }
}
