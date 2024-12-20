﻿using System.ComponentModel.DataAnnotations;

namespace WorkshopManager.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public required string Password { get; set; }

        public bool RememberMe { get; set; } = false;
    }
}
