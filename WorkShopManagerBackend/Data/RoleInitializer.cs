using Microsoft.AspNetCore.Identity;
using WorkshopManager.Models;

namespace WorkshopManager.Data
{
    public class RoleInitializer
    {
        public static async Task Initialize(IServiceProvider serviceProvider, RoleManager<ApplicationRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new ApplicationRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new ApplicationRole("User"));
            }
        }
    }
}
