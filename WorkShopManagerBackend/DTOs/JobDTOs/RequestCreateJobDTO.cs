using System.ComponentModel.DataAnnotations;
using WorkshopManager.Enums;

namespace WorkshopManager.DTOs.JobDTOs
{
    public class RequestCreateJobDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Worker ID is required.")]
        public int WorkerId { get; set; }

        [Required(ErrorMessage = "Supply ID is required.")]
        public int? SupplyId { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
        public int SupplyQuantity { get; set; }

        [Required(ErrorMessage = "Job name is required.")]
        [StringLength(100, ErrorMessage = "Job name cannot exceed 100 characters.")]
        [RegularExpression(@"^(?=.*[A-Za-z])[A-Za-z0-9 ]+$", ErrorMessage = "Job name must contain only letters and numbers.")]
        public required string JobName { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public required string Description { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public JobStatus Status { get; set; }
    }
}