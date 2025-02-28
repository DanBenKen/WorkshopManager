using System.ComponentModel.DataAnnotations;
using WorkshopManager.Enums;

namespace WorkshopManager.DTOs.SupplyDTOs
{
    public class RequestUpdateSupplyDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        [RegularExpression(@"^(?=.*[A-Za-z])[A-Za-z0-9-/ ]+$", ErrorMessage = "Name must contain at least one letter and can include numbers, spaces, hyphens, or slashes.")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
        public required int Quantity { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        public required SupplyType Type { get; set; }
    }
}
