using System.ComponentModel.DataAnnotations;

namespace WorkshopManager.DTOs.WorkerDTOs
{
    public class RequestUpdateWorkerDTO
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
        [StringLength(100, ErrorMessage = "Position cannot exceed 100 characters.")]
        public required string Position { get; set; }
    }
}
