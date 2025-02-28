using WorkshopManager.Enums;

namespace WorkshopManager.DTOs.SupplyDTOs
{
    public class SupplyDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required int Quantity { get; set; }
        public required SupplyType Type { get; set; }
    }
}
