using System.Text.Json.Serialization;
using System.Text.Json;
using WorkshopManager.Enums;

namespace WorkshopManager.Converters
{
    public class JobStatusEnumConverter : JsonConverter<JobStatus>
    {
        public override JobStatus Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return value switch
            {
                "In Progress" => JobStatus.InProgress,
                "Completed" => JobStatus.Completed,
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        public override void Write(Utf8JsonWriter writer, JobStatus value, JsonSerializerOptions options)
        {
            var stringValue = value switch
            {
                JobStatus.InProgress => "In Progress",
                JobStatus.Completed => "Completed",
                _ => throw new ArgumentOutOfRangeException()
            };

            writer.WriteStringValue(stringValue);
        }
    }
}
