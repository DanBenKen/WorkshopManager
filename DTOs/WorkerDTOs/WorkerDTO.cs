﻿namespace WorkshopManager.DTOs.WorkerDTOs
{
    public class WorkerDTO
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Position { get; set; }
    }
}
