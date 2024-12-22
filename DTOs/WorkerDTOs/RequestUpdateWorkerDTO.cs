namespace WorkshopManager.DTOs.WorkerDTOs
{
    public class RequestUpdateWorkerDTO
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Position { get; set; }
    }
}
