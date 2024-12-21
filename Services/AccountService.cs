using Microsoft.AspNetCore.Identity;
using WorkshopManager.DTOs;
using WorkshopManager.Interfaces.ServiceInterfaces;
using WorkshopManager.Models;

namespace WorkshopManager.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterDTO registerDTO)
        {
            var passwordValidationResult = await ValidatePasswordAsync(registerDTO.Password);
            if (!passwordValidationResult.Succeeded)
            {
                return passwordValidationResult;
            }

            var user = new ApplicationUser { UserName = registerDTO.UserName, Email = registerDTO.Email };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

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
                {
                    errors.AddRange(result.Errors);
                }
            }

            return errors.Count != 0 ? IdentityResult.Failed(errors.ToArray()) : IdentityResult.Success;
        }

        public async Task<SignInResult> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user is null)
                return SignInResult.Failed;

            var passwordValid = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!passwordValid)
                return SignInResult.Failed;

            await _signInManager.SignInAsync(user, isPersistent: loginDTO.RememberMe);

            return SignInResult.Success;
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
