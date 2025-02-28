using System.Text.Json;
using System.Text.Json.Serialization;
using WorkshopManager.Enums;

namespace WorkshopManager.Converters
{
    public class SupplyTypeEnumConverter : JsonConverter<SupplyType>
    {
        public override SupplyType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return value switch
            {
                "Motor Oil" => SupplyType.MotorOil,
                "Lubricant" => SupplyType.Lubricant,
                "Coolant" => SupplyType.Coolant,
                "Brake Fluid" => SupplyType.BrakeFluid,
                "Filter" => SupplyType.Filter,
                _ => throw new ArgumentOutOfRangeException()
            };
        }

        public override void Write(Utf8JsonWriter writer, SupplyType value, JsonSerializerOptions options)
        {
            var stringValue = value switch
            {
                SupplyType.MotorOil => "Motor Oil",
                SupplyType.Lubricant => "Lubricant",
                SupplyType.Coolant => "Coolant",
                SupplyType.BrakeFluid => "Brake Fluid",
                SupplyType.Filter => "Filter",
                _ => throw new ArgumentOutOfRangeException()
            };

            writer.WriteStringValue(stringValue);
        }
    }
}
