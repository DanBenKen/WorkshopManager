using Microsoft.AspNetCore.Identity;
using WorkshopManager.DTOs.AccountDTOs;

namespace WorkshopManager.Interfaces.ServiceInterfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(RegisterDTO registerDTO);
        Task<SignInResult> LoginAsync(LoginDTO loginDTO);
        Task LogoutAsync();
    }
}
