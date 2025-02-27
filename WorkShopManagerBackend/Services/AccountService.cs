using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorkshopManager.DTOs.AccountDTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterDTO registerDTO)
        {
            var passwordValidationResult = await ValidatePasswordAsync(registerDTO.Password);
            if (!passwordValidationResult.Succeeded)
                return passwordValidationResult;

            var user = new ApplicationUser { UserName = registerDTO.UserName, Email = registerDTO.Email };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
                await _userManager.AddToRoleAsync(user, "Admin");

            return result;
        }

        public async Task<IdentityResult> ValidatePasswordAsync(string password)
        {
            var passwordValidators = _userManager.PasswordValidators;
            var user = new ApplicationUser();

            var errors = new List<IdentityError>();

            foreach (var validator in passwordValidators)
            {
                var result = await validator.ValidateAsync(_userManager, user, password);
                if (!result.Succeeded)
                    errors.AddRange(result.Errors);
            }

            return errors.Count != 0 ? IdentityResult.Failed(errors.ToArray()) : IdentityResult.Success;
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            if (loginDTO == null || string.IsNullOrEmpty(loginDTO.Email) || string.IsNullOrEmpty(loginDTO.Password))
                throw new ArgumentException("Email and password are required.");

            var user = await _userManager.FindByEmailAsync(loginDTO.Email)
                ?? throw new UnauthorizedAccessException("Invalid e-mail.");

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isPasswordCorrect)
                throw new UnauthorizedAccessException("Invalid password.");

            return await GenerateJwtTokenAsync(user);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<string> GenerateJwtTokenAsync(ApplicationUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var claims = new List<Claim> { new Claim(JwtRegisteredClaimNames.Sub, user.Id) };

            if (!string.IsNullOrEmpty(user.Email))
                claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));

            if (!string.IsNullOrEmpty(user.UserName))
                claims.Add(new Claim(ClaimTypes.Name, user.UserName));

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var keyValue = jwtSettings["Key"];
            if (string.IsNullOrEmpty(keyValue))
                throw new KeyNotFoundException("JWT secret key is missing in the configuration.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expirationInMinutesString = jwtSettings["TokenExpirationInMinutes"];
            if (string.IsNullOrEmpty(expirationInMinutesString) || !double.TryParse(expirationInMinutesString, out var expirationInMinutes))
            {
                expirationInMinutes = 120.0;
            }

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(expirationInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
