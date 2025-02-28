using System.Text.Json.Serialization;
using System.Text.Json;
using WorkshopManager.Enums;

namespace WorkshopManager.Converters
{
    public class WorkerPositionEnumConverter : JsonConverter<WorkerPosition>
    {
        public override WorkerPosition Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return value switch
            {
                "Mechanic" => WorkerPosition.Mechanic,
                "Electrician" => WorkerPosition.Electrician,
                "Painter" => WorkerPosition.Painter,
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        public override void Write(Utf8JsonWriter writer, WorkerPosition value, JsonSerializerOptions options)
        {
            var stringValue = value switch
            {
                WorkerPosition.Mechanic => "Mechanic",
                WorkerPosition.Electrician => "Electrician",
                WorkerPosition.Painter => "Painter",
                _ => throw new ArgumentOutOfRangeException()
            };

            writer.WriteStringValue(stringValue);
        }
    }
}
