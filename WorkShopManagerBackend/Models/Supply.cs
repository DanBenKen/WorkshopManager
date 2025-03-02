using WorkshopManager.Enums;

namespace WorkshopManager.Models
{
    public class Supply
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public required SupplyType Type { get; set; }

        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}
