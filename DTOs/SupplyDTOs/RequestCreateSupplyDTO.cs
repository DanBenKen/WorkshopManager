namespace WorkshopManager.DTOs.SupplyDTOs
{
    public class RequestCreateSupplyDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required int Quantity { get; set; }
        public required string Type { get; set; }
    }
}
