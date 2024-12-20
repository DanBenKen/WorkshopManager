using Microsoft.AspNetCore.Mvc;
using WorkshopManager.DTOs;
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

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.RegisterAsync(registerDTO);
            if (result.Succeeded)
                return CreatedAtAction(nameof(Register), new { email = registerDTO.Email }, registerDTO);

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.LoginAsync(loginDTO);

            if (result.Succeeded)
                return Ok(new { message = "Login successful." });

            return Unauthorized("Invalid login attempt.");
        }
    }
}
