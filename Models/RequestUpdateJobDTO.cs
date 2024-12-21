using System.Text.Json.Serialization;
using WorkshopManager.DTOs;
using WorkshopManager.Enums;

namespace WorkshopManager.Models
{
    public class RequestUpdateJobDTO
    {
        public int Id { get; set; }
        public int WorkerId { get; set; }
        public int SupplyId { get; set; }
        public required string JobName { get; set; }
        public required string Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public JobStatus Status { get; set; }
    }
}
