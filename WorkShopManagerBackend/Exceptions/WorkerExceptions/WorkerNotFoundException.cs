namespace WorkshopManager.Exceptions.WorkerExceptions
{
    public class WorkerNotFoundException : Exception
    {
        public WorkerNotFoundException(int? workerId)
            : base($"Worker with ID {workerId} not found.") { }
    }
}
