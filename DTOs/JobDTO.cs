﻿using System.Text.Json.Serialization;
using WorkshopManager.Enums;

namespace WorkshopManager.DTOs
{
    public class JobDTO
    {
        public int Id { get; set; }
        public int WorkerId { get; set; }
        public int SupplyId { get; set; }
        public required string JobName { get; set; }
        public string? WorkerFirstName { get; set; }
        public string? WorkerLastName { get; set; }
        public required string Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public JobStatus Status { get; set; }
    }
}
