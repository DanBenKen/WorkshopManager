using System.ComponentModel.DataAnnotations;

namespace WorkshopManager.DTOs.SupplyDTOs
{
    public class RequestUpdateSupplyDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
        public required int Quantity { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        [StringLength(50, ErrorMessage = "Type cannot exceed 50 characters.")]
        public required string Type { get; set; }
    }
}
