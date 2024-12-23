namespace WorkshopManager.Exceptions.WorkerExceptions
{
    public class WorkerGetNullException : Exception
    {
        public WorkerGetNullException()
            : base($"Getting worker failed.") { }
    }
}
