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
        public int SupplyId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Supply quantity must be at least 1.")]
        public int SupplyQuantity { get; set; }

        [Required(ErrorMessage = "Job name is required.")]
        [StringLength(100, ErrorMessage = "Job name cannot exceed 100 characters.")]
        public required string JobName { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public required string Description { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public JobStatus Status { get; set; }
    }
}