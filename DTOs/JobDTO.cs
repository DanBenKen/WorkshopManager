using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Text.Json.Serialization;
using WorkshopManager.Enums;

namespace WorkshopManager.DTOs
{
    public class JobDTO
    {
        public int WorkerId { get; set; }
        public string JobName { get; set; }
        public string Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public JobStatus Status { get; set; }
    }
}
