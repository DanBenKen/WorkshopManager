using System.ComponentModel.DataAnnotations;
using WorkshopManager.Enums;

namespace WorkshopManager.DTOs.WorkerDTOs
{
    public class RequestCreateWorkerDTO
    {
        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, ErrorMessage = "First name cannot exceed 50 characters.")]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage = "First name must contain only letters, spaces, or hyphens.")]
        public required string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage = "Last name must contain only letters, spaces, or hyphens.")]
        public required string LastName { get; set; }

        [Required(ErrorMessage = "Position is required.")]
        public Position Position { get; set; }
    }
}
