﻿namespace WorkshopManager.Models
{
    public class Worker
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Position { get; set; }

        public string FullName => $"{FirstName} {LastName}";

        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}
