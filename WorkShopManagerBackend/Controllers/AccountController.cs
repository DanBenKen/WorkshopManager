﻿using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs.AccountDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;

namespace WorkshopManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.RegisterAsync(registerDTO);
            if (result.Succeeded)
                return CreatedAtAction(nameof(Register), new { email = registerDTO.Email }, registerDTO);

            var errorMessages = result.Errors.Select(e => e.Description).ToList();
            return BadRequest(new { errors = errorMessages });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = await _accountService.LoginAsync(loginDTO);
            if (token == null)
                return Unauthorized("Unauthorized login attempt.");

            return Ok(new { Token = token });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _accountService.LogoutAsync();
            return Ok("Logout successful.");
        }
    }
}
