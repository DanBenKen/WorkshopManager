using System.Text.Json.Serialization;
using System.Text.Json;
using WorkshopManager.Enums;

namespace WorkshopManager.Converters
{
    public class PositionEnumConverter : JsonConverter<Position>
    {
        public override Position Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return value switch
            {
                "Mechanic" => Position.Mechanic,
                "Electrician" => Position.Electrician,
                "Painter" => Position.Painter,
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        public override void Write(Utf8JsonWriter writer, Position value, JsonSerializerOptions options)
        {
            var stringValue = value switch
            {
                Position.Mechanic => "Mechanic",
                Position.Electrician => "Electrician",
                Position.Painter => "Painter",
                _ => throw new ArgumentOutOfRangeException()
            };

            writer.WriteStringValue(stringValue);
        }
    }
}
