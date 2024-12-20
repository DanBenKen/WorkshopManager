namespace WorkshopManager.Exceptions
{
    public class WorkerNotFoundException : Exception
    {
        public WorkerNotFoundException(int workerId)
            : base($"Worker with ID {workerId} not found.") {}
    }
}
