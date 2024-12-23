using System.ComponentModel.DataAnnotations;

namespace WorkshopManager.DTOs.AccountDTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        public required string UserName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required.")]
        [Compare("Password", ErrorMessage = "Password and Confirm Password do not match.")]
        public required string ConfirmPassword { get; set; }
    }
}
